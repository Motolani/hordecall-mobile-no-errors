import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from "@rneui/themed";

const TwoGridBox = ({ onPress1, onPress2, onPress3, name1, name2, name3 }) => {
  return (
    <View style= {styles.BoxContainer}>
        <View style= {styles.Box}>
            <TouchableOpacity onPress= {onPress1} style={styles.inner}>
                <TouchableOpacity onPress= {onPress1} >
                    <Icon name="mail-outline" size={30} color="#00bfff" />
                </TouchableOpacity>
                <Text style={styles.TheText}>{name1}</Text>
            </TouchableOpacity>
        </View>
        
        <View style= {styles.Box}>
            <TouchableOpacity onPress= {onPress2} style={styles.inner}>
                <TouchableOpacity onPress= {onPress2}>
                    <Icon name="mic-outline" size={30} color="#00bfff" />
                </TouchableOpacity>
                <Text style={styles.TheText}>{name2}</Text>
            </TouchableOpacity>
        </View>
        
        <View style= {styles.Box}>
            <TouchableOpacity onPress= {onPress3} style={styles.inner}>
                <TouchableOpacity onPress= {onPress3}>
                    <Icon name="wallet-outline" size={30} color="#00bfff" />
                </TouchableOpacity>
                <Text style={styles.TheText}>{name3}</Text>
            </TouchableOpacity>
        </View>
        
        {/* <View style= {styles.Box}>
            <View style={styles.inner}>
                
                <TouchableOpacity onPress= {onPress4}>
                    <Icon name="md-card-outline" size={30} color="#00bfff" />
                </TouchableOpacity>
                <Text style={styles.TheText}>Bills Payment</Text>
            </View>
        </View> */}
    </View>
    )
}

const styles = StyleSheet.create({
    BoxContainer: {
        width: hp('50%'),
        height: hp('67%'),
        backgroundColor: '#F0F0F0',
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 65,
        
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    Box: {
        width: hp('18%'),
        height: hp('18%'),
        padding: 5,
        backgroundColor: '#ffc0cb',
        borderRadius: 30,
        marginTop: 15,
        marginEnd: 15,
        marginLeft: 22
    },
    inner: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    TheText: {
        // fontSize: ,
        color: '#696969',
        fontWeight: 'bold',
    }
});
export default TwoGridBox