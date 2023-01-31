import { View, Text, SafeAreaView, StyleSheet, ScrollView, StatusBar, TextInput, Alert } from 'react-native';
import React, { useState, useContext, useEffect} from 'react';
import SmsHeader from '../../../components/SmsHeader';
import InputWithText from '../../../components/InputWithText';
import CustomButton from '../../../components/CustomButton';
import InputWithTextarea from '../../../components/InputWithTextarea';
import { AuthContext } from '../../../context/AuthContext';
import { SelectList } from 'react-native-dropdown-select-list';
import axios from 'axios';

const TextToSpeechTwo = () => {
    
    // const [msisdn, setMsisdn] = useState('');
    const [words, setWords] = useState('');
    const [responseMessage, setResponseMessage] = useState(null);
    const [responseStatus, setResponseStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dropdownElement, setDropdownElement] = useState([]);
    
    const { logout, userToken } = useContext(AuthContext);
 
    const AlertFunc = (message, status) => {
        if(status === '200'){
            Alert.alert(  
                'Successful',  
                message,  
                [  
                    {text: 'Ok', onPress: () => console.log('OK Pressed')},  
                ]  
            );  
        }else if(status === '300'){
            Alert.alert(  
                '400',  
                message,  
                [  
                    {text: 'Try Again', onPress: () => console.log('OK Pressed')},  
                ]  
            );  
        }else if(status === '309'){
            Alert.alert(  
                '400',  
                message,  
                [  
                    {text: 'Credit Account', onPress: () => console.log('OK Pressed')},  
                ]  
            );  
        }else{
            Alert.alert(  
                '400',  
                message,  
                [  
                    {text: 'Ok', onPress: () => console.log('OK Pressed')},  
                ]  
            );  
        }
        
    }  
    
    const handleSubmit = async () => {
        setIsLoading(true)
        const msgBody = {words, msisdn}
        console.log('message: '+ JSON.stringify(msgBody));
        
        try {
            const {data} = await axios.post('https://hordecall.net/new/public/api/text2speech', msgBody, { headers: {apiToken: userToken } } )
            
            console.log(data)
            if(data.status === "200"){
                // setErrorMessage(null);
                // setInsufficientMessage(null);
                AsyncStorage.removeItem('errorMessage');
                
                let responseMessage = data.message;
                let responseStatus = data.status;
                
                setResponseMessage(responseMessage);
                setResponseStatus(responseStatus);
                
                AsyncStorage.setItem('responseMessage', JSON.stringify(responseMessage));
                
                setWords('');            
            }
            if(data.status === "302"){
                logout();
            }
            if(data.status === "309"){
                
                let insufficientMessage = data.message;
                let responseStatus = data.status;
                
                setResponseMessage(insufficientMessage);
                setResponseStatus(responseStatus);

                AsyncStorage.setItem('errorMessage', JSON.stringify(insufficientMessage));
                
            }
            
            // setInsufficientMessage(null);
            // setResponseMessage(null);
            let errorMessage = data.message;
            let responseStatus = data.status;
            
            setResponseMessage(errorMessage);
            setResponseStatus(responseStatus);
            
            AsyncStorage.setItem('errorMessage', JSON.stringify(errorMessage));
            
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }
    
    const dropdownData = async () => {
        try {
            const {data} = await axios.get('https://hordecall.net/new/public/api/contact', { headers: {apiToken: userToken } } )
            
            // console.log(data);
            
            if(data.status === "200"){
                let contactFiles = data.data.data
                
                initialArray = [];
                
                contactFiles.forEach(contact => {
                    initialArray.push({'key' : contact.id, 'value' : contact.name});
                    // dropdownElements.push(initialArray);
                });
                
             
                setDropdownElement(initialArray);
                
            }else if(data.status === "302"){
                logout();
            }else{
                ErrorAlert(data.message);
            }
            let dropdownElements = initialArray;

        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        dropdownData();
    }, []);
    return (
        <ScrollView >       
            <SmsHeader/>
            
            {!isLoading  && responseMessage && <View style={styles.viewMessage}><Text style={styles.errorMessage}>{AlertFunc(responseMessage, responseStatus)}</Text></View>}
            
            
            <View style={styles.Heading}>
                <Text style={styles.HeadingText}> Select numbers from uploaded lists</Text>
            </View>
            <View  style={styles.container}>
                
                <View style={styles.dropdown}>
                    <Text style={styles.Label}>Select List</Text>
                    <SelectList
                        labeltext={'Select list'}
                        label={'lists'}
                        data={dropdownElement}
                        save={'key'}
                        textlabel={'Select List'}
                        setSelected={(val) => setSelected(val)} 
                    />
                </View>
                
                <View style={styles.Input}>
                    <InputWithTextarea 
                    placeholder="Message to be sent"
                    multiline={true}
                    numberOfLines={10}
                    value={words} 
                    setValue={setWords}
                    label={'Message'} 
                    />
                    
                </View>
                <CustomButton 
                text="Send Text to Speech" 
                onPress={handleSubmit} 
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
    },
    successMessage:{
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    errorMessage:{
        fontSize: 20,
        color: '#ff0000',
        fontWeight: 'bold',
    },
    viewMessage: {
        marginTop: 20,
        alignItems: 'center',
    },
    Label:{
        color: 'rgb(0, 122, 255)',
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom:10,
        alignItems: 'flex-start',
    },
    dropdown:{
        paddingTop: 20,
        width: 325,
    },
})
export default TextToSpeechTwo