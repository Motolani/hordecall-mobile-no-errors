import { View, Text, SafeAreaView, StyleSheet, ScrollView, SectionList, TextInput, Alert } from 'react-native';
import React, { useState, useContext, useEffect, useCallback} from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { FlashList } from "@shopify/flash-list";
import { FlatList } from 'react-native-gesture-handler';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const SmsTransaction = () => {
    const [responseMessage, setResponseMessage] = useState(null);
    const [responseStatus, setResponseStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [insufficientMessage, setInsufficientMessage] = useState(null);
    const [smsHistory, setSmsHistory] = useState([]);
    const { logout, userToken } = useContext(AuthContext);
    
    
    let wallet 
    
    const AlertFunc = (message, status) => {
        if(status === '300'){
            Alert.alert(  
                '400',  
                message,  
                [  
                    {text: 'Try Again', onPress: () => console.log('OK Pressed')},  
                ]  
            );  
        }else if(status === '302'){
          Alert.alert(  
              '309',  
              message,  
              [  
                  {text: 'Login', onPress: () => logout()},  
              ]  
          );  
      }
    }  
    
    const handleSubmit = useCallback(async () => {
      setIsLoading(true);
      
      const  msgBody = {type: 'sms'}
      
      try {
        const {data} = await axios.post(
          'https://hordecall.net/new/public/api/transactions', msgBody,
          {headers: {apiToken: userToken}},
        );
        console.log('Response');
        console.log(data);
        
        if (data.status === '200') {
          let smsData = data.data;
          console.log('response in variable');
          console.log(smsData);
          
          setSmsHistory(smsData);
          
          console.log('stateSet');
          console.log(smsHistory);
          
        } else if (data.status === '302') {
          // let message = "Session Expired"
          // let status = "302"
          // setResponseMessage(message);
          // setResponseStatus(status);
          logout();
        } else if (data.status === '300') {
          let errorMessage = data.message;
          let status = data.status;
  
          setResponseMessage(errorMessage);
          setResponseStatus(status);
  
          AlertFunc(responseMessage, responseStatus);
  
          AsyncStorage.setItem('errorMessage', JSON.stringify(errorMessage));
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }, []);
    
    const status = ( status ) => {
      let sms_status
      
      if(status == 3){
        sms_status = "SENT"
      }else if(status == 2){
        sms_status = "FAILED"
      }else{
        sms_status = "PENDING"
      }
      return sms_status
    }
    console.log(isLoading);
    useEffect(() => {
      handleSubmit()
      // return () => {
        // console.log('girls')
      // }
    }, [handleSubmit])
  return (
    <SafeAreaView style={styles.container}> 
    {isLoading ? <Text> Loading... </Text>:<View>
      <View style={styles.headView}>
        <Text style={styles.heading}>Sms Transactions</Text>
      </View>
      <FlatList
        data={smsHistory}
        renderItem={({item}) => <Text style={styles.item}>{item.description} - {item.sender_id} - {item.created_at} - {status(item.sms_status)}</Text>}
      />
      </View>}
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16
  },
  item: {
    backgroundColor: "#dc143c",
    color: "#fff",
    padding: 20,
    marginVertical: 8
  },
  heading: {
    fontSize: 22,
    color: "#dc143c",
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: 15,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24
  }
});
export default SmsTransaction