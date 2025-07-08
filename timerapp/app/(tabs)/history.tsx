import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import {
  Button
} from 'react-native';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await AsyncStorage.getItem('history');
      if (data) {
        setHistory(JSON.parse(data));
      }
    };
    fetchHistory();
  }, []);

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const parts = [];
    if (hrs > 0) parts.push(`${hrs}h`);
    if (mins > 0) parts.push(`${mins}m`);
    parts.push(`${secs}s`);

    return parts.join(' ');
    };

    const handleExportHistory = async () => {
        try {
            const data = await AsyncStorage.getItem('history');
            if (!data) return alert('No history data to export.');

            const fileUri = FileSystem.documentDirectory + 'timer_history.json';

            await FileSystem.writeAsStringAsync(fileUri, data, {
            encoding: FileSystem.EncodingType.UTF8,
            });

            await Sharing.shareAsync(fileUri);
        } catch (error) {
            console.error('Export failed:', error);
            alert('Failed to export history.');
        }
    };


  return (
        <View style={styles.container}>
        <Text style={styles.heading}>⏱ Timer History</Text>

        <View style={styles.exportButtonWrapper}>
            <Button title="📁 Export History as JSON" onPress={handleExportHistory} />
        </View>

        <FlatList
            data={history}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
            <View style={styles.historyCard}>
                <Text style={styles.timerName}>{item.name}</Text>
                <Text style={styles.completedText}>✅ Completed:</Text>
                <Text style={styles.timestamp}>{new Date(item.time).toLocaleString()}</Text>
                <Text style={styles.duration}>⏱ Duration: {formatDuration(item.duration)}</Text>
            </View>
            )}
            ListEmptyComponent={
            <Text style={styles.emptyMessage}>No timers completed yet.</Text>
            }
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  exportButtonWrapper: {
    marginBottom: 20,
    alignSelf: 'center',
    width: '80%',
  },
  historyCard: {
    backgroundColor: '#fefefe',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  timerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  completedText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2e7d32',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  duration: {
    fontSize: 14,
    color: '#1e88e5',
    fontWeight: '600',
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});


