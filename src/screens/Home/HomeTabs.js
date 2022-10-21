import { View, Text, Image, useWindowDimensions, StyleSheet} from 'react-native'
import React, {useState}  from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TransactionsScreen from '../TransactionsScreen';
import DashboardScreen from '../DashboardScreen';
import ScheduleScreen from '../ScheduleScreen';
import SettingsScreen from '../SettingsScreen';

const HomeTabs = ({}) => {
  const Tab = createBottomTabNavigator();
  
  return (
   
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
    
  )
}

const styles = StyleSheet.create({
  
})
export default HomeTabs