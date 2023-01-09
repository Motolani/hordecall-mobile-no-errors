import React, {useContext} from 'react';
import { SafeAreaView,Text,ActivityIndicator, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './src/screens/SignInScreen';
import HomeTabs from './src/screens/Home/HomeTabs';
import RegisterScreen from './src/screens/registerScreen/RegisterScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from './style';
import { AuthContext, AuthProvider, useGlobalContext } from './src/context/AuthContext';
import SmsScreen from './src/screens/SmsScreen';
import VoiceScreen from './src/screens/VoiceScreen';
import VoiceTransaction from './src/screens/VoiceTransaction';
import SmsTransaction from './src/screens/SmsTransaction';
import WalletTransaction from './src/screens/WalletTransaction';
import VoiceRecording from './src/screens/VoiceRecording';
import TextToSpeechScreen from './src/screens/TextToSpeechScreen/TextToSpeechScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Hordecall = () => {
  const {isLoading, userToken, userInfo } = useContext(AuthContext);
  console.log(isLoading);
  
  
  if( isLoading ){
    return(
      <View style={styles.ActIndicator}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  return (
      <NavigationContainer>
      <Stack.Navigator >
       {userToken !== null ? <Stack.Screen options={{ headerStyle: { backgroundColor: '#d3d3d3', } }} name={userInfo.user.name} style={styles.homeTab} component={HomeTabs} /> : <Stack.Screen  options={{headerStyle: { backgroundColor: '#d3d3d3',} }} name="Login" component={SignInScreen} />}  
         
        <Stack.Screen options={{ headerStyle: { backgroundColor: '#d3d3d3', } }} name="Register" component={RegisterScreen} />
        
        <Stack.Screen options={{ headerStyle: { backgroundColor: '#d3d3d3', } }} name="SmsScreen" component={SmsScreen} />
        
        <Stack.Screen options={{ headerStyle: { backgroundColor: '#d3d3d3', } }} name="VoiceScreen" component={VoiceScreen} />
        
        <Stack.Screen options={{ headerStyle: { backgroundColor: '#d3d3d3', } }} name="TextToSpeechScreen" component={TextToSpeechScreen} />
        
        <Stack.Screen options={{ headerStyle: { backgroundColor: '#d3d3d3', } }} name="VoiceTransaction" component={VoiceTransaction} />
        
        <Stack.Screen options={{ headerStyle: { backgroundColor: '#d3d3d3', } }} name="SmsTransaction" component={SmsTransaction} />
        
        <Stack.Screen options={{ headerStyle: { backgroundColor: '#d3d3d3', } }} name="WalletTransaction" component={WalletTransaction} />
        
        <Stack.Screen options={{ headerStyle: { backgroundColor: '#d3d3d3', } }} name="RecordVoice" component={VoiceRecording} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
};

export default Hordecall;