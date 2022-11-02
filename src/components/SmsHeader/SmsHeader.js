import { View, Text, StyleSheet, Image, useWindowDimensions, TouchableOpacity} from 'react-native';
import React, {useContext}  from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../../../assets/images/img.png';
import { AuthContext} from '../../context/AuthContext';


const SmsHeader = () => {
    const { userInfo } = useContext(AuthContext);
    
    const { height } = useWindowDimensions();
    return (
        <View style={styles.header}>
            <View style={styles.row}>
                <Image 
                source={Logo} 
                style={[styles.Logo, {height: height * 0.12}]} 
                resizeMode="contain" 
                />
                    
                    <Text style={styles.userInfo}>
                        <Icon name="person-outline" styles={styles.userIcon} size={20} color="#ffffff" />
                        {userInfo.user.name}
                    </Text>
                    
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: hp('100%'),
        height: hp('17.5%'),
        backgroundColor: '#ff0000',
        borderBottomLeftRadius: hp('40%'),
        // overflow: 'hidden'
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 38,
        
    },
    headerBalance: {
        fontSize: hp('3.5%'),
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: hp('2.5'),

    },
    BalanceContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 205,
        marginTop: -30,
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    Logo:{
        marginTop: -30,
        // marginBottom: 5,
        marginLeft: -90,
    },
    userInfo:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: hp('2.3'),
        paddingTop: 15,
        marginLeft: -45,
    },
    userIcon: {
       
    },
    eyeConContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        paddingLeft:20
    },
    eyeCon: {
        // paddingRight:5
    },
    userDetails:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    }, 
    fundWallet:{
        paddingLeft:275,
        paddingTop:25
    },
    
});
export default SmsHeader