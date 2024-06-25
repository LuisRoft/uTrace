import { Image } from 'react-native';
import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/Navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { styles } from '@/styles/tabBarStyles';
import { KeyboardAvoidingView, Platform } from 'react-native';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <KeyboardAvoidingView
    style = {{flex: 1}}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="activity"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'map' : 'map-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="emotions"
          options={{
            title : '',
            tabBarIcon: ({}) => (
              <Image
                source={require('@/assets/images/icon.png')} 
                style={{ width: 40, height: 40 }} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'calendar-clear' : 'calendar-clear-outline'} color={color} />
            ),
          }}  
        />
        <Tabs.Screen
          name="report"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'document-text' : 'document-text-outline'} color={color} />
            ),
          }}
        />
      </Tabs>
    </KeyboardAvoidingView>
  );
}