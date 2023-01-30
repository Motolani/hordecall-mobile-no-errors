import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Record from './Record';
import RecordedFiles from './RecordedFiles';
import Icon from 'react-native-vector-icons/Ionicons';

const SmsScreen = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Contacts" 
        component={Record} 
        options={{
          tabBarLabel:'Record',      
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="mic-circle-outline" size={30} color="#ff0000" />
          ),
        }}/>
      {/* <Tab.Screen 
        name="Manual" 
        component={RecordedFiles} 
        options={{
          tabBarLabel:'Recorded files',      
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="reader-outline" size={30} color="#ff0000" />
          ),
        }}/> */}
    </Tab.Navigator>
  )
}

export default SmsScreen