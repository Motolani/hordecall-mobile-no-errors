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

const WalletTransaction = () => {
    const [responseMessage, setResponseMessage] = useState(null);
    const [responseStatus, setResponseStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [insufficientMessage, setInsufficientMessage] = useState(null);
    const [walletHistory, setWalletHistory] = useState([]);
    const { logout, userToken } = useContext(AuthContext);
    let thisData = [
      {description: 'Devin'},
      {description: 'Dan'},
      {description: 'Dominic'},
      {description: 'Jackson'},
      {description: 'James'},
      {description: 'Joel'},
      {description: 'John'},
      {description: 'Jillian'},
      {description: 'Jimmy'},
      {description: 'Julie'},
      {description: 'Oyin'},
    ]
    
    
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
  
      try {
        const {data} = await axios.get(
          'https://hordecall.net/new/public/api/wallet-history',
          {headers: {apiToken: userToken}},
        );
        console.log('Response');
        console.log(data);
        
        if (data.status === '200') {
          let walletData = data.data;
          console.log('response in variable');
          console.log(walletData);
          
          setWalletHistory(walletData);
          
          console.log('stateSet');
          console.log(walletHistory);
          
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
    
    // const handleSubmit = async () => {
    //     setIsLoading(true)
        
    //     try {
    //         const {data} = await axios.get('https://hordecall.net/new/public/api/wallet-history', { headers: {apiToken: userToken } } )
            
    //         if(data.status === "200"){
            
    //           let walletData = data.data;
              
    //           setWalletHistory(walletData);
    //           console.log('here i am')
    //           console.log(data.data)
    //           console.log('here i am again')
              
    //           console.log(walletHistory)
            
    //         }else if(data.status === "302"){
    //           // let message = "Session Expired"
    //           // let status = "302"
    //           // setResponseMessage(message);
    //           // setResponseStatus(status);
    //           logout()
              
    //         }else if(data.status === "300"){
                
    //           let errorMessage = data.message;
    //           let status = data.status;
              
    //           setResponseMessage(errorMessage);
    //           setResponseStatus(status);
              
    //           AlertFunc(responseMessage, responseStatus);
              
    //           AsyncStorage.setItem('errorMessage', JSON.stringify(errorMessage));
    //         }
            
    //     } catch (error) {
    //         console.log(error)
    //     }
    //     setIsLoading(false)
    // }
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
        <Text style={styles.heading}>Wallet Transactions</Text>
      </View>
      <FlatList
        data={walletHistory}
        renderItem={({item}) => <Text style={styles.item}>{item.description} - N{item.amount_charged} - {item.type} - {item.created_at} </Text>}
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
export default WalletTransaction