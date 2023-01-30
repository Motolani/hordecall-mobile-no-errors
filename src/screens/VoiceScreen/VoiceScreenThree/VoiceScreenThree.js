import { View, Text, StyleSheet, ScrollView, StatusBar, TextInput, Alert, Button } from 'react-native';
import React, { useState, useContext, useEffect} from 'react';
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
import { FileContext } from '../../../context/FileContext';

const VoiceScreenThree = () => {
    const [senderId, setSenderId] = useState('');
    const [description, setDescription] = useState('');
    const [schedule, setSchedule] = useState('');
    // const [msisdn, setMsisdn] = useState('');
    const [playLength, setPlayLength] = useState(0);
    const [maxRetries, setMaxRetries] = useState(0);
    const [retryTime, setRetryTime] = useState(0);
    const [selected, setSelected] = useState('');
    const [enableSms, setEnableSms] = useState(0);
    const [responseMessage, setResponseMessage] = useState(null);
    const [responseStatus, setResponseStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [insufficientMessage, setInsufficientMessage] = useState(null);
    const [dropdownElement, setDropdownElement] = useState([]);
    const { logout, userToken } = useContext(AuthContext);
    const [elementVisible, setElementVisible] = useState(false);
    const [fromDocument, setFromDocument] = useState(0);
    const [fromDocumentUri, setFromDocumentUri] = useState('');
    const [fromDocumentPath, setFromDocumentPath] = useState('');
    const [fromDocumentType, setFromDocumentType] = useState('');
    
    const { filePath, fileUri, uploading } = useContext(FileContext);
    
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
        
        let theUri 
        theUri = fileUri.replace('file://','')
        
         //     let formData = {senderId, description, numbers, audio_file:i.name,retry_time:retryTime, max_retries:maxRetries, play_length:playLength}
        // console.log('message: '+ JSON.stringify(formData));
        
        
        const url = 'https://hordecall.net/new/public/api/voice'
        
        const formData = new FormData();
        
        formData.append('senderId', senderId);
        formData.append('description', description);
        formData.append('numbers', numbers);
        formData.append('retry_time', retryTime);
        formData.append('max_retries', maxRetries);
        formData.append('play_length', playLength);
        formData.append('enable_sms', enableSms);
        
        if(uploading == 0){
            formData.append('audio_file', {
                    uri: fileUri,
                    name: filePath,
                    type: 'audio/m4a', 
                }
            );
        }else{
            formData.append('audio_file', {
                    uri: fromDocumentUri,
                    name: fromDocumentPath,
                    type: fromDocumentType, 
                }
            );
        }
        
    
        console.log('formData: '+ JSON.stringify(formData));
        
        try {
            let res = await fetch(url, {
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    apiToken: userToken
                }
            });
            let responseJson = await res.json();
            
            console.log('here');
            console.log(responseJson);
            
            if (responseJson.status == "200") {
                let responseMessage = responseJson.message;
                let responseStatus = responseJson.status;
            
                setResponseMessage(responseMessage);
                setResponseStatus(responseStatus);
                
                setDescription('');
                setSenderId('');
                setSchedule('');
                setRetryTime(0);
                setMaxRetries(0);
                setPlayLength(0);
                setEnableSms(0);
                
                
                Alert.alert("Profile picture updated Successful");
            }
            if(responseJson.status === "302"){
                logout();
            }
            if(responseJson.status === "309"){
            
                let insufficientMessage = responseJson.message;
                let responseStatus = responseJson.status;
                
                setResponseMessage(insufficientMessage);
                setResponseStatus(responseStatus);
                
                Alert.alert(insufficientMessage);
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }
    
    const handleDocumentSelection = async () => {
            // console.log('gotten here')
        try {
            // setFromDocument(1);
        console.log('now here')
            const response = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.audio],
                presentationStyle: 'fullScreen',
            });
            console.log('here')
            setFileResponse(response);
            console.log(response);
            
            console.log(i.uri, i.name, i.size, i.type)
            setFromDocumentUri(i.uri);
            setFromDocumentPath(i.name);
            setFromDocumentType(i.type);
            
        } catch (err) {
        // console.log('now here')
            console.warn(err);
        }
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
    const max_retries = [
        {  value: '1' },
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
    
    useEffect(() => {
        dropdownData();
    }, []);
    
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
                    value={senderId} 
                    setValue={setSenderId} 
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
                {uploading == 0 ? <InputWithText 
                    value={filePath} 
                    selectTextOnFocus={false}
                    editable={false}
                    // setValue={setNumbers} 
                    label={'Audio File'} /> : <InputWithText 
                    value={fromDocumentPath} 
                    selectTextOnFocus={false}
                    editable={false}
                    // setValue={setNumbers} 
                    label={'Audio File'} />}
                </View>
                
                {uploading == 1 ? (<View style={styles.Input}>
                    <Button title="Select 📑" onPress={handleDocumentSelection}/>
                </View>) : null}
                
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
                
                <View style={styles.dropdown}>
                    <Text style={styles.Label}>Select Play Length</Text>
                    <SelectList
                        // labeltext={'Select list'}
                        label={'play length'}
                        data={play_length}
                        save={'value'}
                        setSelected={(val) => setPlayLength(val)} 
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
                        setSelected={(val) => setMaxRetries(val)} 
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
                        setSelected={(val) => setRetryTime(val)} 
                    />
                </View>
                
                <View style={styles.Input}>
                <BouncyCheckbox
                    size={25}
                    fillColor="red"
                    unfillColor="#FFFFFF"
                    text="Enable SMS"
                    iconStyle={{ borderColor: "black" }}
                    innerIconStyle={{ borderWidth: 2 }}
                    onPress={(isChecked) => {
                        setEnableSms(1)
                    }}
                    />
                </View>
                
                <CustomButton 
                text="Send Voice Call" 
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

export default VoiceScreenThree