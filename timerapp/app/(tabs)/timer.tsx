import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SectionList,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { lightTheme, darkTheme } from '../../utils/themes';
import { Feather } from '@expo/vector-icons';

export default function TimerScreen() {
  const [timers, setTimers] = useState([]);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [expandedCategories, setExpandedCategories] = useState([]);
  const intervalsRef = useRef({});
  const [showModal, setShowModal] = useState(false);
  const [completedTimerName, setCompletedTimerName] = useState('');
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const loadTimers = async () => {
      const data = await AsyncStorage.getItem('timers');
      if (data) setTimers(JSON.parse(data));
    };
    loadTimers();
  }, []);

  const saveTimers = async (updatedTimers) => {
    setTimers(updatedTimers);
    await AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));
  };

  const handleAddTimer = () => {
    if (!name || !duration || !category) return;
    const newTimer = {
      id: Date.now().toString(),
      name,
      duration: parseInt(duration),
      remaining: parseInt(duration),
      category,
      status: 'Paused',
      halfwayAlert: true,
      halfwayNotified: false,
    };
    const updatedTimers = [...timers, newTimer];
    saveTimers(updatedTimers);
    setName('');
    setDuration('');
    setCategory('');
  };

  const toggleCategory = (cat) => {
    setExpandedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const saveHistoryEntry = async (entry) => {
    const existing = await AsyncStorage.getItem('history');
    const history = existing ? JSON.parse(existing) : [];
    const updated = [...history, entry];
    await AsyncStorage.setItem('history', JSON.stringify(updated));
  };

  const handleStart = (id) => {
    if (intervalsRef.current[id]) return;
    intervalsRef.current[id] = setInterval(() => {
      setTimers(prevTimers => {
        const updatedTimers = prevTimers.map(timer => {
          if (timer.id === id) {
            const newRemaining = timer.remaining - 1;
            if (timer.halfwayAlert && !timer.halfwayNotified && newRemaining === Math.floor(timer.duration / 2)) {
              alert(`⏰ Halfway done: ${timer.name}`);
              return { ...timer, remaining: newRemaining, status: 'Running', halfwayNotified: true };
            }
            if (newRemaining <= 0) {
              clearInterval(intervalsRef.current[id]);
              delete intervalsRef.current[id];
              const completedTime = new Date().toISOString();
              saveHistoryEntry({ name: timer.name, time: completedTime, duration: timer.duration });
              setCompletedTimerName(timer.name);
              setShowModal(true);
              return { ...timer, remaining: 0, status: 'Completed' };
            }
            return { ...timer, remaining: newRemaining, status: 'Running' };
          }
          return timer;
        });
        AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));
        return updatedTimers;
      });
    }, 1000);
  };

  const handlePause = (id) => {
    clearInterval(intervalsRef.current[id]);
    delete intervalsRef.current[id];
    setTimers(prev => {
      const updated = prev.map(timer => timer.id === id && timer.status === 'Running' ? { ...timer, status: 'Paused' } : timer);
      AsyncStorage.setItem('timers', JSON.stringify(updated));
      return updated;
    });
  };

  const handleReset = (id) => {
    clearInterval(intervalsRef.current[id]);
    delete intervalsRef.current[id];
    setTimers(prev => {
      const updated = prev.map(timer =>
        timer.id === id ? { ...timer, remaining: timer.duration, status: 'Paused', halfwayNotified: false } : timer);
      AsyncStorage.setItem('timers', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDelete = (id) => {
    clearInterval(intervalsRef.current[id]);
    delete intervalsRef.current[id];
    const updatedTimers = timers.filter(timer => timer.id !== id);
    saveTimers(updatedTimers);
  };

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const parts = [];
    if (hrs > 0) parts.push(hrs.toString().padStart(2, '0'));
    if (hrs > 0 || mins > 0) parts.push(mins.toString().padStart(2, '0'));
    parts.push(secs.toString().padStart(2, '0'));
    return parts.join(':');
  };

  const groupedData = Object.entries(
    timers.filter(timer => selectedCategory === 'All' || timer.category === selectedCategory)
      .reduce((acc, timer) => {
        acc[timer.category] = acc[timer.category] || [];
        acc[timer.category].push(timer);
        return acc;
      }, {})
  ).map(([title, data]) => ({ title, data }));

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
    <View style={styles.topRow}>
      <View style={styles.topActions}>
        <Pressable style={styles.historyButton} onPress={() => navigation.navigate('history')}>
          <Feather name="clock" size={18} color="#fff" />
          <Text style={styles.historyText}>History</Text>
        </Pressable>
        <Pressable style={styles.themeButton} onPress={() => setIsDarkMode(prev => !prev)}>
          <Feather name={isDarkMode ? 'sun' : 'moon'} size={22} color="#fff" />
        </Pressable>
      </View>
    </View>
      <Text style={[styles.heading, { color: theme.text }]}>Add Timer</Text>
      <TextInput style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text }]} placeholder="Timer Name" value={name} onChangeText={setName} />
      <TextInput style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text }]} placeholder="Duration (seconds)" value={duration} onChangeText={setDuration} keyboardType="numeric" />
      <TextInput style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text }]} placeholder="Category" value={category} onChangeText={setCategory} />
      <Button title="Add Timer" onPress={handleAddTimer} />

      <Text style={[styles.heading, { color: theme.text }]}>Your Timers</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={value => setSelectedCategory(value)}
          style={styles.enhancedPicker}
          dropdownIconColor="#007bff"
          mode="dropdown"
        >
          <Picker.Item label="All" value="All" />
          {[...new Set(timers.map(timer => timer.category))].map(cat => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>
      <SectionList
        sections={groupedData}
        keyExtractor={item => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <>
            <Pressable onPress={() => toggleCategory(title)}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <Text style={styles.sectionToggle}>{expandedCategories.includes(title) ? '▼' : '▶'}</Text>
              </View>
            </Pressable>
          </>
        )}
        renderItem={({ item, section }) => expandedCategories.includes(section.title) && (
          <View style={styles.timerItem}>
            <Text style={styles.timerName}>{item.name}</Text>
            <Text>⏳ {formatTime(item.remaining)}</Text>
            <Text>Status: {item.status}</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBarFill, {
                width: `${((item.duration - item.remaining) / item.duration) * 100}%`,
                backgroundColor: item.status === 'Completed' ? '#a5d6a7' : item.status === 'Running' ? 'green' : '#2196f3'
              }]} />
            </View>
            <Text style={styles.percentageTextBold}>{Math.floor(((item.duration - item.remaining) / item.duration) * 100)}%</Text>
            <View style={styles.buttonRow}>
              <Button title="Start" onPress={() => handleStart(item.id)} />
              <Button title="Pause" onPress={() => handlePause(item.id)} />
              <Button title="Reset" onPress={() => handleReset(item.id)} />
              <Button title="Delete" color="red" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />

      <Modal visible={showModal} transparent animationType="fade" onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>🎉 Timer Completed!</Text>
            <Text style={styles.modalTimerName}>{completedTimerName}</Text>
            <Button title="Close" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },

  topActions: {
    flexDirection: 'row',
    gap: 10, // Optional: For modern RN
    alignItems: 'center',
  },

  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
  },

  historyText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 14,
  },

  themeButton: {
    backgroundColor: '#333',
    padding: 6,
    borderRadius: 6,
  },

  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    fontSize: 14,
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginVertical: 10,
    overflow: 'hidden',
  },

  enhancedPicker: {
    height: 50,
    fontSize: 16,
    width: '100%',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },

  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  sectionToggle: {
    fontSize: 16,
  },

  timerItem: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 6,
    marginTop: 5,
  },

  timerName: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 10,
  },

  progressBarContainer: {
    height: 10,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },

  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },

  percentageTextBold: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'right',
    marginTop: 4,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },

  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },

  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  modalTimerName: {
    fontSize: 18,
    marginBottom: 20,
    color: '#2196f3',
  },
});
