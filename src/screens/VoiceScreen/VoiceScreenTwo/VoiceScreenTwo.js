import { View, Text, StyleSheet, ScrollView, StatusBar, TextInput, Alert, Button } from 'react-native';
import React, { useState, useContext, useEffect, useCallback} from 'react';
import SmsHeader from '../../../components/SmsHeader';
import InputWithText from '../../../components/InputWithText';
import CustomButton from '../../../components/CustomButton';
// import InputWithTextarea from '../../../components/InputWithTextarea';
import { AuthContext } from '../../../context/AuthContext';
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as DocumentPicker from 'react-native-document-picker';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const VoiceScreenTwo = () => {
    const [senderid, setsenderid] = useState('');
    const [description, setDescription] = useState('');
    const [schedule, setSchedule] = useState('');
    // const [msisdn, setMsisdn] = useState('');
    const [playLength, setPlayLength] = useState(0);
    const [maxRetries, setMaxRetries] = useState(0);
    const [retryTime, setRetryTime] = useState(0);
    const [numbers, setNumbers] = useState('');
    const [enableSms, setEnableSms] = useState(0);
    const [responseMessage, setResponseMessage] = useState(null);
    const [responseStatus, setResponseStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [insufficientMessage, setInsufficientMessage] = useState(null);
    const [fileResponse, setFileResponse] = useState([]);
    const { logout, userToken } = useContext(AuthContext);
    const [elementVisible, setElementVisible] = useState(false);
 
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
        const msgBody = {senderid, description, msisdn, message, msgid}
        console.log('message: '+ JSON.stringify(msgBody));
        
        try {
            const {data} = await axios.post('https://hordecall.net/new/public/api/multiplesms', msgBody, { headers: {apiToken: userToken } } )
            
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
                
                setDescription('');
                setsenderid('');
                setSchedule('');
                setMsisdn('');
                setMessage('');
                setmsgid('');
            
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
    
    const handleDocumentSelection = async () => {
            // console.log('gotten here')
        try {
        // console.log('now here')
            // const response = await DocumentPicker.pick({
            //     type: [DocumentPicker.types.allFiles],
            //     presentationStyle: 'fullScreen',
            // });
            // // console.log('here')
            // // setFileResponse(response);
            // // console.log(response);
            // for (i in response){
            //     console.log(i.uri, i.name, i.size, i.type)
            // }
            const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.allFiles]
            })
            console.log(res)
        } catch (err) {
        // console.log('now here')
            console.warn(err);
        }
    }
    
    const max_retries = [
        { value: '1' },
        { value: '2' },
        { value: '3' },
    ];
    
    const retry_time = [
        { value: '1' },
        { value: '2' },
        { value: '3' },
    ];
    
    const play_length = [
        { value: '30' },
        { value: '40' },
        { value: '50' },
        { value: '60' },
    ];
    
    return (
        <ScrollView >       
            <SmsHeader/>
            
            {!isLoading  && responseMessage && <View style={styles.viewMessage}><Text style={styles.errorMessage}>{AlertFunc(responseMessage, responseStatus)}</Text></View>}
            
            
            <View style={styles.Heading}>
                <Text style={styles.HeadingText}> Seperate each number with a comma(,)</Text>
            </View>
            <View  style={styles.container}>
                
                <View style={styles.Input}>
                    <InputWithText 
                    placeholder="Sender Phone Number" 
                    value={senderid} 
                    setValue={setsenderid} 
                    label={'Sender ID'} />
                </View>
                
                <View style={styles.Input}>
                    <InputWithText 
                    placeholder="Description" 
                    value={description} 
                    setValue={setDescription} 
                    label={'Description'} />
                </View>
                
                {/* <View style={styles.Input}>
                    <CheckBoxWithText
                        value={schedule} 
                        setValue={setSchedule} 
                        label={'Time Schedule'} />
                </View> */}
                
                <View style={styles.Input}>
                    <InputWithText 
                    placeholder="Seperate each number with a comma" 
                    value={numbers} 
                    setValue={setNumbers} 
                    label={'Enter Numbers'} />
                </View>
                
                <View style={styles.dropdown}>
                    <Text style={styles.Label}>Select Play Length</Text>
                    <SelectList
                        // labeltext={'Select list'}
                        label={'play length'}
                        data={play_length}
                        save={'value'}
                        setSelected={(val) => setSelected(val)} 
                    />
                </View>
                
                <View style={styles.dropdown}>
                    <Text style={styles.Label}>Select Max Retries</Text>
                    <SelectList
                        // labeltext={'Select list'}
                        label={'max retries'}
                        data={max_retries}
                        save={'value'}
                        textlabel={'Select List'}
                        setSelected={(val) => setSelected(val)} 
                    />
                </View>
                
                <View style={styles.dropdown}>
                    <Text style={styles.Label}>Select Retry Time</Text>
                    <SelectList
                        // labeltext={'Select list'}
                        label={'retry time'}
                        data={retry_time}
                        save={'value'}
                        textlabel={'Select List'}
                        setSelected={(val) => setSelected(val)} 
                    />
                </View>
                
                <View style={styles.Input}>
                <BouncyCheckbox
                    size={25}
                    fillColor="red"
                    unfillColor="#FFFFFF"
                    text="Select From File"
                    iconStyle={{ borderColor: "red" }}
                    innerIconStyle={{ borderWidth: 2 }}
                    // textStyle={{ fontFamily: "JosefinSans-Regular" }}
                    onPress={(isChecked) => {
                        setElementVisible(!elementVisible)
                    }}
                    />
                </View>
                
                {elementVisible ? (<View style={styles.Input}>
                    <Button title="Select 📑" onPress={handleDocumentSelection}/>
                </View>) : null}
                
                <CustomButton 
                text="Send SMS" 
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
    dropdown:{
        paddingTop: 20,
        width: 325,
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
    Label:{
        color: 'rgb(0, 122, 255)',
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom:10,
        alignItems: 'flex-start',
    },
    viewMessage: {
        marginTop: 20,
        alignItems: 'center',
    }
})

export default VoiceScreenTwo