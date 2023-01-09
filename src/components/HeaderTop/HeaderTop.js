import { View, Text, StyleSheet, Image, useWindowDimensions, TouchableOpacity} from 'react-native';
import React, {useContext}  from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../../../assets/images/img.png';
import { AuthContext} from '../../context/AuthContext';


const HeaderTop = () => {
    const { userInfo, userBalance, WalletBal} = useContext(AuthContext);
    const { height } = useWindowDimensions();
    
    const onSubmit = async() => {
        await WalletBal(); 
      }
    console.log('balance: ' +userBalance);
    
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
                <TouchableOpacity onPress={onSubmit}>
                    <Icon name="eye" styles={styles.eyeCon} size={28} color="#ffffff" />
                </TouchableOpacity>
                
                <View style={styles.eyeConContainer}>
                        <Icon name="wallet-outline" styles={styles.wallet} size={25} color="#ffffff" />
                    <Text style={styles.headerBalance}> : N {userBalance}</Text>
                </View>    
                
            </View>
            
            <View style={styles.Fund} >
                <TouchableOpacity >
                <Text style={styles.fundWalletText}> 
                    <Icon name="md-card" style={styles.fundWallet}  size={28} color="#ffffff" />
                    {/* Fund Wallet */}
                </Text>
                    
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
        paddingLeft: 180,
        marginTop: -30,
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    Logo:{
        marginTop: -25,
        marginLeft: -90,
    },
    userInfo:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: hp('2.2'),
        paddingTop: 15,
        marginLeft: -30,
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
        paddingRight:25,
        marginRight:25,
    },
    fundWalletText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: hp('2.0'),
        // marginLeft:15,
    },
    Fund: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 180,
        paddingTop:25
    },
});
export default HeaderTop