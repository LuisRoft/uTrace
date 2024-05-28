import { Tabs } from 'expo-router'
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: 'Actividad',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name = "emotions"
        options = {{
          title : 'Emotions',
          tabBarIcon :({color, focused}) => (
            <TabBarIcon name ={focused ? 'happy-outline' : 'happy-outline'} color = {color}/>
          )
        }}
      />
      <Tabs.Screen
        name = "calendar"
        options = {{
          title : 'Calendar',
          tabBarIcon : ({color, focused}) => (
            <TabBarIcon name = {focused ? 'calendar-clear' : 'calendar-clear-outline'} color = {color}/>
          )
        }}  
      />
      <Tabs.Screen
        name = "report"
        options ={{
          title : 'Report',
          tabBarIcon : ({color, focused}) => (
            <TabBarIcon name = {focused ? 'paper-plane' : 'paper-plane-outline'} color = {color}/>
          )
        }}
      />
    </Tabs>
  );
}