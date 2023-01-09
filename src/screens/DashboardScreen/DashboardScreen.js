import { Alert, View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import HeaderTop from '../../components/HeaderTop';
import GridBox from '../../components/GridBox';

const DashboardScreen = ( {navigation} ) => {
  const ErrorAlert = () => {
      Alert.alert(  
        '404',  
        'Bills Payment Coming Soon!',  
        [  
            {text: 'OK', onPress: () => console.log('OK Pressed')},  
        ]  
    );  
  }  
  return (
    <SafeAreaView>
      <HeaderTop />
      <GridBox 
          onPress1={() => navigation.navigate("SmsScreen")} 
          onPress2={() => navigation.navigate("VoiceScreen")} 
          onPress3={() => navigation.navigate("TextToSpeechScreen")} 
          onPress4={ErrorAlert} 
          />
    </SafeAreaView>
  )
}

export default DashboardScreen