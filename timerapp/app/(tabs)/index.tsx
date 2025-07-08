import { StyleSheet, View, ImageBackground, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Pressable, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('@/assets/images/clockbackground.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>⏱️ Timer App</Text>
        <Text style={styles.subtitle}>Track, Focus, and Finish Strong 💪</Text>

        <Pressable style={styles.button} onPress={() => router.push('/timer')}>
          <Feather name="clock" size={20} color="#fff" />
          <Text style={styles.buttonText}>Go to Timer</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push('/history')}>
          <Feather name="list" size={20} color="#fff" />
          <Text style={styles.buttonText}>View History</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
