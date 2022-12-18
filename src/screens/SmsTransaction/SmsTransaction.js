import { View, Text } from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Table, Row, Rows } from 'react-native-table-component';

const SmsTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [smsTransactions, setSmsTransactions] = useState(null);
  const [tableHead, setTableHead] = useState(['Created', 'Recipient', 'Status', 'Description', 'Scheduled']);
  

  const { userToken } = useContext(AuthContext);
  
  const smsTransaction = async () => {
    setIsLoading(true)
    // const transType = "sms";
        
    await axios.post('https://hordecall.net/new/public/api/transactions', {type: "sms"}, { headers: {apiToken: userToken } } )
      .then(res => {
        
        if(res.data.status === "200"){
          console.log(res.data.data);
          
          setErrorMessage(null);
          setSmsTransactions(res.data.data);
          AsyncStorage.removeItem('errorMessage');
          AsyncStorage.removeItem('SmsTransactions');
          AsyncStorage.setItem('SmsTransactions', JSON.stringify(res.data.data));
          
        }else if(res.data.status === "302"){
          logout();
        }else{
          let errorMessage = res.data.message;
          
          console.log(errorMessage)
          setErrorMessage(errorMessage);
          AsyncStorage.setItem('errorMessage', JSON.stringify(errorMessage));
        }
        
      })
      .catch(e => {
        console.log('login error', e)
      });
    setIsLoading(false);
}

  useEffect(() => {
    smsTransaction();
  }, []);
  
  return (
    <View>
      <Text> </Text>
    </View>
  )
  
  
}

export default SmsTransaction