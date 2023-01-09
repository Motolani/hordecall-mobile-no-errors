import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TextToSpeechOne from './TextToSpeechOne';
import TextToSpeechTwo from './TextToSpeechTwo';
import Icon from 'react-native-vector-icons/Ionicons';
// import TextToSpeachScreen from '.';

const TextToSpeechScreen = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {/* <Tab.Screen 
        name="Contacts" 
        component={SmsScreenOne} 
        options={{
          tabBarLabel:'Contacts',      
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="phone-portrait-outline" size={30} color="#ff0000" />
          ),
        }}/> */}
      <Tab.Screen 
        name="Manual" 
        component={TextToSpeechOne} 
        options={{
          tabBarLabel:'Manual',      
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="keypad-outline" size={30} color="#ff0000" />
          ),
        }}/>
      <Tab.Screen 
        name="List" 
        component={TextToSpeechTwo} 
        options={{
          tabBarLabel:'List',      
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="reader-outline" size={30} color="#ff0000" />
          ),
        }}/>
    </Tab.Navigator>
  )
}

export default TextToSpeechScreen