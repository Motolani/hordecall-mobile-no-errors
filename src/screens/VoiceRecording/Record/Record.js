import {  View, Text, StyleSheet, ScrollView, StatusBar, TextInput, Alert, Button, SafeAreaView } from 'react-native'
import React, { useState, useContext, useEffect, useCallback     }  from 'react'
import CustomButton from '../../../components/CustomButton';
import { FileContext } from '../../../context/FileContext';

import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AVModeIOSOption,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import Icon from 'react-native-vector-icons/Ionicons';




const Record = () => {
        
    const [recordSecs, setRecordSecs] = useState(0);
    const [recordTime, setRecordTime] = useState('00:00:00');
    const [currentPositionSec, setCurrentPositionSec] = useState(0);
    const [currentDurationSec, setCurrentDurationSec] = useState(0);
    const [playTime, setPlayTime] = useState('00:00:00');
    const [duration, setDuration] = useState('00:00:00');
    const [file, setFile] = useState('');
    const [recording, setRecording] = useState(0);
    
    const { setFilePath, setFileUri, fileUri, filePath} = useContext(FileContext);
    
    
    const audioRecorderPlayer = new AudioRecorderPlayer();
    audioRecorderPlayer.setSubscriptionDuration(0.09);
    
    let pathExtention = Math.floor(Math.random() * 100);
    const path = `HordecallVoice${pathExtention}.m4a`;
    
    const meteringEnabled = false;
    
    const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVModeIOS: AVModeIOSOption.measurement,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    
    
    
    const onStartRecord = useCallback(async () => {
        console.log('audioSet', audioSet);
        console.log('path', path);
        setRecording(1);
    
        let uri;
        
        try {
            uri = await audioRecorderPlayer.startRecorder(path, audioSet, meteringEnabled);
        } catch (e) { console.log("ERR audioRecorderPlayer.startRecorder: ", e) }
        
        audioRecorderPlayer.addRecordBackListener((e) => {
            let recordSecs = e.currentPosition;
            let recordTime = audioRecorderPlayer.mmssss(
                Math.floor(e.currentPosition),
            );
            setRecordSecs(recordSecs),
            setRecordTime(recordTime)
            
        });
        
        console.log('recordSecs:' + recordSecs);
        console.log('recordTime:' + recordTime);
        console.log(`uri: ${uri}`);
        setFile(uri);
        
        setFileUri(uri);
        setFilePath(path);
        
        console.log('file_path: '+filePath);
        console.log('uri_path: '+fileUri);
    }, []);
    
    
    const onStopRecord = useCallback(async () => {
        setRecording(0);
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setRecordSecs(0);
        // setRecordTime('00:00:00');
        console.log(result);
    }, []);
    
    const onStartPlay = useCallback(async (e) => {
        console.log('onStartPlay');
        // const path = 'hello.m4a'
        const msg = await audioRecorderPlayer.startPlayer(path);
        audioRecorderPlayer.setVolume(1.0);
        console.log(msg);
        audioRecorderPlayer.addPlayBackListener((e) => {
            if (e.currentPosition === e.duration) {
                console.log('finished');
                audioRecorderPlayer.stopPlayer();
            }
            setCurrentPositionSec(e.currentPosition),
            setCurrentPositionSec(e.duration),
            setPlayTime(audioRecorderPlayer.mmssss(
                Math.floor(e.currentPosition),
            )),
            setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)))
        });
    }, []);
    
    const onPausePlay = useCallback(async (e) => {
        await audioRecorderPlayer.pausePlayer();
    }, []);
    
    const onStopPlay = useCallback(async (e) => {
        console.log('onStopPlay');
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
    }, []);
    
    
    return (
        <SafeAreaView style={styles.MainContainer}>
            <View style={styles.dropdown}>
                <Text>HORDECALL</Text>
            </View>
            <View style={styles.dropdown}>  
                <Text>{recordTime}</Text>
            </View>
            
            <View style={styles.dropdown}> 
                
                    {recording == 0 ? (<CustomButton 
                    text={<Icon name="mic" size={30} color="#00bfff" />} 
                    onPress={() => onStartRecord()} 
                    type="Hordecall"
                    textColor="Hordecall"/>) : <CustomButton 
                    text={<Icon name="stop-circle-sharp" size={30} color="#00bfff" />} 
                    onPress={() => onStopRecord()} 
                    type="Hordecall"
                    textColor="Hordecall"/>}
            </View>
            
            {/* <View style={styles.dropdown}> 
                <CustomButton 
                    text="STOP" 
                    onPress={() => onStopRecord()} 
                    type="Hordecall"
                    textColor="Hordecall"/>
            </View> */}
            
            <View style={styles.dropdown}> 
                <Text>{playTime} / {duration}</Text>
            </View>
            
            <View style={styles.dropdown}> 
                <CustomButton 
                    text="PLAY" 
                    onPress={() => onStartPlay()} 
                    type="Hordecall"
                    textColor="Hordecall"/>
            </View>
            
            <View style={styles.dropdown}> 
                <CustomButton 
                    text="PAUSE" 
                    onPress={() => onPausePlay()} 
                    type="Hordecall"
                    textColor="Hordecall"/>
            </View>
            
            <View style={styles.dropdown}> 
                <CustomButton 
                text="STOP" 
                onPress={() => onStopPlay()} 
                type="Hordecall"
                textColor="Hordecall"/>
            </View>
        </SafeAreaView>
      )
}

const styles = StyleSheet.create({
    MainContainer:{
        alignItems: "center",
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
        alignItems: "center",
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

export default Record