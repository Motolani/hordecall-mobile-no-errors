// import { Table, Row, Rows } from 'react-native-table-component';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, StatusBar, TextInput } from 'react-native';
import React, {useContext} from 'react';
import SmsHeader from '../../components/SmsHeader';
import TwoGridBox from '../../components/TwoGridBox';
import { TransactionsContext } from '../../context/TransactionsContext';

const TransactionsScreen = ( {navigation} ) => {
  const { SmsTransaction } = useContext(TransactionsContext);
  const onSubmit1 = async() => {
    let type = {
      'type': 'sms'
    };
    await SmsTransaction(type); 
    () => navigation.navigate("SmsTransaction")
  }
  
  return (
    <SafeAreaView >
      <SmsHeader style={styles.box} />
      <TwoGridBox 
          onPress1={() => navigation.navigate("SmsTransaction")} name1="Sms"
          onPress2={() => navigation.navigate("VoiceTransaction")} name2="Voice"
          onPress3={() => navigation.navigate("WalletTransaction")} name3="Wallet"
          />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
 
    box:{
        paddingBottom: 50,
    },
    scroll:{
        flexGrow: 1,
    },
    Heading:{
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    HeadingText:{
        fontWeight: 'bold',
        color: '#dc143c',
    }
})

export default TransactionsScreen