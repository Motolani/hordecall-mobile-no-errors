import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SmsScreenOne from './SmsScreenOne';
import SmsScreenTwo from './SmsScreenTwo';
import SmsScreenThree from './SmsScreenThree';
import Icon from 'react-native-vector-icons/Ionicons';

const SmsScreen = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Contacts" 
        component={SmsScreenOne} 
        options={{
          tabBarLabel:'Contacts',      
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="phone-portrait-outline" size={30} color="#ff0000" />
          ),
        }}/>
      <Tab.Screen 
        name="Manual" 
        component={SmsScreenTwo} 
        options={{
          tabBarLabel:'Manual',      
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="keypad-outline" size={30} color="#ff0000" />
          ),
        }}/>
      <Tab.Screen 
        name="List" 
        component={SmsScreenThree} 
        options={{
          tabBarLabel:'List',      
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="reader-outline" size={30} color="#ff0000" />
          ),
        }}/>
    </Tab.Navigator>
  )
}

export default SmsScreen