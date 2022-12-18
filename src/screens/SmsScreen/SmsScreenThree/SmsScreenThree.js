import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import React, { useState, useContext, useEffect} from 'react';
import SmsHeader from '../../../components/SmsHeader';
import InputWithText from '../../../components/InputWithText';
import CustomButton from '../../../components/CustomButton';
import InputWithTextarea from '../../../components/InputWithTextarea';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import SelectList from '../../../components/SelectWithText';

const SmsScreenThree = () => {
    const [senderid, setsenderid] = useState('');
    const [description, setDescription] = useState('');
    const [schedule, setSchedule] = useState('');
    const [message, setMessage] = useState('');
    const [msgid, setmsgid] = useState('');
    const [responseMessage, setResponseMessage] = useState(null);
    const [responseStatus, setResponseStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dropdownElement, setDropdownElement] = useState([]);
    const { logout, userToken } = useContext(AuthContext);
    const [selected, setSelected] = useState('');
 
    const AlertFunc = (message, status) => {
        if(status == '200'){
            Alert.alert(  
                'Successful',  
                message,  
                [  
                    {text: 'Ok', onPress: () => console.log('OK Pressed')},  
                ]  
            );  
        }else if(status == '300'){
            Alert.alert(  
                '400',  
                message,  
                [  
                    {text: 'Try Again', onPress: () => console.log('OK Pressed')},  
                ]  
            );  
        }else if(status == '309'){
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
    
    const ErrorAlert = (message) => {
        Alert.alert(  
          {message},  
          'Error!',  
          [  
              {text: 'OK', onPress: () => console.log('OK Pressed')},  
          ]  
      )}; 
    
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
    
    const handleSubmit = async () => {
        setIsLoading(true)
        let senderId = senderid;
        let group = selected;
        const msgBody = {senderId, description, group, message, msgid}
        console.log('message: '+ JSON.stringify(msgBody));
        console.log(selected);
        
        try {
            const {data} = await axios.post('https://hordecall.net/new/public/api/bulksms', msgBody, { headers: {apiToken: userToken } } )
            
            console.log(data)
            console.log(data.status)
            
            
            if(data.status == "200"){

                AsyncStorage.removeItem('errorMessage');
                
                let responseMessage = data.message;
                let responseStatus = data.status;
                
                console.log('if');
                
                setResponseMessage(responseMessage);
                setResponseStatus(responseStatus);
                
                AsyncStorage.setItem('responseMessage', JSON.stringify(responseMessage));
                
                setDescription('');
                setsenderid('');
                setSchedule('');
                setSelected('');
                setMessage('');
                setmsgid('');
            
            }else if(data.status == "302"){
                logout();
            }else if(data.status == "309"){
                
                let insufficientMessage = data.message;
                let responseStatus = data.status;
                
                console.log('if else');
                
                setResponseMessage(insufficientMessage);
                setResponseStatus(responseStatus);

                AsyncStorage.setItem('errorMessage', JSON.stringify(insufficientMessage));
                
            }else{
                // setInsufficientMessage(null);
                // setResponseMessage(null);
                let errorMessage = data.message;
                let responseStatus = data.status;
                
                console.log('else');
                setResponseMessage(errorMessage);
                setResponseStatus(responseStatus);
                
                AsyncStorage.setItem('errorMessage', JSON.stringify(errorMessage));
            }
            
            
            
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
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
                    <InputWithText 
                    placeholder="Schedule Time to be sent" 
                    value={schedule} 
                    setValue={setSchedule} 
                    label={'Time Schedule'} />
                </View> */}
                
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
                    <InputWithText 
                    placeholder="Enter Message Id"
                    value={msgid} 
                    setValue={setmsgid} 
                    label={'Message Id'} 
                    maxLength={100}/>
                </View>
                
                <View style={styles.Input}>
                    <InputWithTextarea 
                    placeholder="Message to be sent"
                    multiline={true}
                    numberOfLines={10}
                    value={message} 
                    setValue={setMessage}
                    label={'Message'} 
                    />
                    
                </View>
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
    Label:{
        color: 'rgb(0, 122, 255)',
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom:10,
        alignItems: 'flex-start',
    },
    selectInput:{
        paddingTop: 20,
        // paddingLeft: -30,
        alignContent: 'auto',  
    },
    select:{
        marginTop: 10,
        marginVertical: 5,
        paddingVertical: 15,
        paddingLeft: 25,
    },
    
})

export default SmsScreenThree