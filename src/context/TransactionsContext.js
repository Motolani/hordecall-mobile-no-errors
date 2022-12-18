import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const TransactionsContext = createContext();

const TransactionsProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [smsTransactions, setSmsTransactions] = useState(null);
  
  const { logout, userToken } = useContext(AuthContext);
  console.log(userToken);
  const SmsTransaction = async () => {
    setIsLoading(true)
    const transType = "sms";
        
    await axios.post('https://hordecall.net/new/public/api/transactions', transType, { headers: {apiToken: userToken } } )
      .then(res => {
        
        console.log(res.data);
        
        if(res.data.status === "200"){
          console.log(res.data.data);
          
          setErrorMessage(null);
          setSmsTransactions(res.data.data);
          AsyncStorage.removeItem('errorMessage');
          AsyncStorage.removeItem('SmsTransactions');
          AsyncStorage.setItem('SmsTransactions', res.data.data);
          
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
    SmsTransaction();
  }, []);

  return (
    <TransactionsContext.Provider value={{isLoading, errorMessage, SmsTransaction, smsTransactions}}>
      {children}
    </TransactionsContext.Provider>
  );
};

export {TransactionsContext, TransactionsProvider};
