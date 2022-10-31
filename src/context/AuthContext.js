import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  

  const login = async (email, password) => {
    const authUser = {email, password}
    
      setIsLoading(true)
      axios.post('https://hordecall.net/new/public/api/login', authUser)
        .then(res => {
          console.log(res.data);
          
          if(res.data.status === "200"){
            
            setErrorMessage(null);
            AsyncStorage.removeItem('errorMessage');
            let userInfo = res.data;
            
            setUserInfo(userInfo);
            setUserToken(userInfo.user.api_token);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            AsyncStorage.setItem('userToken', userInfo.user.api_token);
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
  const logout = () => {
  
    setIsLoading(true);
    setUserToken(null);
    setErrorMessage(null);
    AsyncStorage.removeItem('errorMessage');
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('userInfo');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');
      userInfo = JSON.parse(userInfo);
      
      
      if( userInfo ){
        setUserToken(userToken);
        setUserInfo(userInfo);
      }
      setIsLoading(false);
      
    } catch (e) {
      console.log(`isLogged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{login, logout, isLoading, userToken, userInfo, errorMessage}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
