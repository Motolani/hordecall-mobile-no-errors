import {  View, Text, StyleSheet, ScrollView, StatusBar, TextInput, Alert, Button, SafeAreaView } from 'react-native'
import React, { useState, useContext, useEffect }  from 'react'
import CustomButton from '../../../components/CustomButton';

import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';




const Record = () => {
        
    const [recordSecs, setRecordSecs] = useState(0);
    const [recordTime, setRecordTime] = useState('00:00:00');
    const [currentPositionSec, setCurrentPositionSec] = useState(0);
    const [currentDurationSec, setCurrentDurationSec] = useState(0);
    const [playTime, setPlayTime] = useState('00:00:00');
    const [duration, setDuration] = useState('00:00:00');
    
    const audioRecorderPlayer = new AudioRecorderPlayer();
    audioRecorderPlayer.setSubscriptionDuration(0.09);
        
    onStartRecord = async () => {
    
        const path = 'hello.m4a';
        const audioSet = {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            AudioSourceAndroid: AudioSourceAndroidType.MIC,
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
            AVNumberOfChannelsKeyIOS: 2,
            AVFormatIDKeyIOS: AVEncodingOption.aac,
        };
        console.log('audioSet', audioSet);
        console.log('path', path);
        
        const meteringEnabled = false;

        let uri;
        
        try {
            uri = await audioRecorderPlayer.startRecorder(path, meteringEnabled, audioSet);
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
    };
    
    
    onStopRecord = async () => {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setRecordSecs(0)
        console.log(result);
    };
    
    onStartPlay = async (e) => {
        console.log('onStartPlay');
        const path = 'hello.m4a'
        const msg = await audioRecorderPlayer.startPlayer(path);
        audioRecorderPlayer.setVolume(1.0);
        console.log(msg);
        audioRecorderPlayer.addPlayBackListener((e) => {
            if (e.currentPosition === e.duration) {
                console.log('finished');
                audioRecorderPlayer.stopPlayer();
            }
            setCurrentPositionSec(e.currentPosition),
            currentPositionSec(e.duration),
            setPlayTime(audioRecorderPlayer.mmssss(
                Math.floor(e.currentPosition),
            )),
            setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)))
        });
    };
    
    onPausePlay = async (e) => {
        await audioRecorderPlayer.pausePlayer();
    };
    
    onStopPlay = async (e) => {
        console.log('onStopPlay');
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
    };
    
    
    return (
        <SafeAreaView style={styles.MainContainer}>
            <View style={styles.dropdown}>
                <Text>HORDECALL</Text>
            </View>
            <View style={styles.dropdown}>  
                <Text>{recordTime}</Text>
            </View>
            
            <View style={styles.dropdown}> 
                <CustomButton 
                    text="RECORD" 
                    onPress={() => onStartRecord()} 
                    type="Hordecall"
                    textColor="Hordecall"/>
            </View>
            
            <View style={styles.dropdown}> 
                <CustomButton 
                    text="STOP" 
                    onPress={() => onStopRecord()} 
                    type="Hordecall"
                    textColor="Hordecall"/>
            </View>
            
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