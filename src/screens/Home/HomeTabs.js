import { View, Text, Image, useWindowDimensions, StyleSheet} from 'react-native'
import React, {useState}  from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TransactionsScreen from '../TransactionsScreen';
import DashboardScreen from '../DashboardScreen';
import ScheduleScreen from '../ScheduleScreen';
import SettingsScreen from '../SettingsScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeTabs = ({}) => {
  const Tab = createBottomTabNavigator();
  
  return (
   
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Home" 
        component={DashboardScreen} 
        options={{
          tabBarLabel:'Home',      
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="home-outline" size={30} color="#ff0000" />
          ),
        }}/>
      <Tab.Screen 
        name="Transactions" 
        component={TransactionsScreen} 
        options={{
          tabBarLabel:'Transactions',      
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="receipt-outline" size={30} color="#ff0000" />
          ),
        }}/>
      <Tab.Screen 
        name="Schedule" 
        component={ScheduleScreen} 
        options={{
          tabBarLabel:'Schedules',      
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="today-outline" size={30} color="#ff0000" />
          ),
        }}/>
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          tabBarLabel:'Settings',      
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="settings-outline" size={30} color="#ff0000" />
          ),
        }}/>
    </Tab.Navigator>
    
  )
}

const styles = StyleSheet.create({
  
})
export default HomeTabs