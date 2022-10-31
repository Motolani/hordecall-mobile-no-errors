import { View, Text, StyleSheet, Image, useWindowDimensions, TouchableOpacity} from 'react-native';
import React, {useContext}  from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../../../assets/images/img.png';
import { AuthContext} from '../../context/AuthContext';


const HeaderTop = () => {
    const { userInfo } = useContext(AuthContext);
    
    const { height } = useWindowDimensions();
    return (
        <View style={styles.header}>
            <View style={styles.row}>
                <Image 
                source={Logo} 
                style={[styles.Logo, {height: height * 0.155}]} 
                resizeMode="contain" 
                />
                    
                    <Text style={styles.userInfo}>
                        <Icon name="person" styles={styles.userIcon} size={20} color="#ffffff" />
                        {userInfo.user.name}
                    </Text>
                    
            </View>
            <View style={styles.BalanceContainer}>
                <TouchableOpacity>
                    <Icon name="eye" styles={styles.eyeCon} size={28} color="#ffffff" />
                </TouchableOpacity>
                
                <View style={styles.eyeConContainer}>
                        <Icon name="wallet-outline" styles={styles.wallet} size={25} color="#ffffff" />
                    <Text style={styles.headerBalance}>: N9000</Text>
                </View>    
                
            </View>
            
            <View >
                <TouchableOpacity >
                    <Icon name="md-card" style={styles.fundWallet}  size={28} color="#ffffff" />
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: hp('100%'),
        height: hp('33%'),
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
        marginTop: -25,
        // marginBottom: 5,
        marginLeft: -90,
    },
    userInfo:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: hp('2.2'),
        paddingTop: 15,
        marginLeft: -10,
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
export default HeaderTop