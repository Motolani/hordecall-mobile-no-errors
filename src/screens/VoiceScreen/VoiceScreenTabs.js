import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VoiceScreenOne from './VoiceScreenOne';
import VoiceScreenTwo from './VoiceScreenTwo';
import VoiceScreenThree from './VoiceScreenThree';
import Icon from 'react-native-vector-icons/Ionicons';
import Record from '../VoiceRecording/Record';

const VoiceScreenTabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      
      <Tab.Screen 
        name="Manual" 
        component={VoiceScreenTwo} 
        options={{
          tabBarLabel:'Manual',      
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="keypad-outline" size={30} color="#ff0000" />
          ),
        }}/>
        
        {/* <Tab.Screen 
        name="Contacts" 
        component={Record} 
        options={{
          tabBarLabel:'Record',      
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="mic-circle-outline" size={30} color="#ff0000" />
          ),
        }}/> */}
        
      <Tab.Screen 
        name="List" 
        component={VoiceScreenThree} 
        options={{
          tabBarLabel:'List',      
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="reader-outline" size={30} color="#ff0000" />
          ),
        }}/>
    </Tab.Navigator>
  )
}

export default VoiceScreenTabs