import { View, Text, SafeAreaView, StyleSheet, ScrollView, StatusBar, TextInput } from 'react-native';
import React, {useState} from 'react';
import SmsHeader from '../../../components/SmsHeader';
import InputWithText from '../../../components/InputWithText';
import CustomButton from '../../../components/CustomButton';

const SmsScreenTwo = () => {
    const [phonenumber, setPhonenumber] = useState('');
    const [description, setDescription] = useState('');
    const [schedule, setSchedule] = useState('');
    const [recipientNumbers, setRecipientNumbers] = useState('');
    const [message, setMessage] = useState('');
    return (
        <ScrollView >
            
            <SmsHeader/>
            <View style={styles.Heading}>
                <Text style={styles.HeadingText}> Seperate each number with a comma(,)</Text>
            </View>
            <View  style={styles.container}>
                
                <View style={styles.Input}>
                    <InputWithText 
                    placeholder="Sender Phone Number" 
                    value={phonenumber} 
                    setValue={setPhonenumber} 
                    keyboardType={'numeric'}
                    maxLength={11} 
                    label={'Sender ID'} />
                </View>
                
                <View style={styles.Input}>
                    <InputWithText 
                    placeholder="Description" 
                    value={description} 
                    setValue={setDescription} 
                    label={'Description'} />
                </View>
                
                <View style={styles.Input}>
                    <InputWithText 
                    placeholder="Schedule Time to be sent" 
                    value={schedule} 
                    setValue={setSchedule} 
                    label={'Time Schedule'} />
                </View>
                
                <View style={styles.Input}>
                    <InputWithText 
                    placeholder="Seperate each number with a comma" 
                    value={recipientNumbers} 
                    setValue={setRecipientNumbers} 
                    label={'Enter Numbers'} />
                </View>
                <View style={styles.Input}>
                    <InputWithText 
                    placeholder="Message to be sent" 
                    value={message} 
                    setValue={setMessage} 
                    label={'Message'} 
                    maxLength={100}/>
                </View>
                <CustomButton 
                text="Send SMS" 
                // onPress={onSignUpPressed} 
                type="Hordecall"
                textColor="Hordecall"/>
            </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    MainContainer:{
        // flex:1,
        // paddingTop: StatusBar.currentHeight,
    },
    container:{
        alignItems: "center",
    },
    Input:{
        paddingTop: 20,
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
export default SmsScreenTwo