import React from 'react';
import { SafeAreaView,Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './src/screens/SignInScreen';
import HomeTabs from './src/screens/Home/HomeTabs';
import RegisterScreen from './src/screens/registerScreen/RegisterScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from './style';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Hordecall = () => {

  return (
  
    <NavigationContainer>
      <Stack.Navigator >
        {/* <Stack.Screen  options={{
          headerStyle: {
            backgroundColor: '#d3d3d3',
          } }} 
          name="Login" 
          component={SignInScreen} />  */}
        
        <Stack.Screen options={{
          headerStyle: {
            backgroundColor: '#dc143c',
          } }} 
          name="User Home" 
          component={HomeTabs} />
        {/* <Stack.Screen options={{
          headerStyle: {
            backgroundColor: '#d3d3d3',
          } }} 
          name="Register" 
          component={RegisterScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Hordecall;