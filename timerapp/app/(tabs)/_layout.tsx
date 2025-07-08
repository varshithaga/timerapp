import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarLabel: route.name.charAt(0).toUpperCase() + route.name.slice(1),
        headerShown: false,
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'index') iconName = 'home';
          else if (route.name === 'explore') iconName = 'search';
          else if (route.name === 'timer') iconName = 'clock';        // ⏱️ Timer Icon
          else if (route.name === 'history') iconName = 'list';       // 📋 History Icon

          return <Feather name={iconName as any} size={size} color={color} />;
        },
      })}
    />
  );
}
