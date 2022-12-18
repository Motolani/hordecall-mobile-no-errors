import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
const CheckBoxWithText = ({label, onChange, disabled, testID, value, onValueChange }) => {
  return (

    <View style={styles.container}>
      <Text style={styles.Label}>{label}</Text>
      <CheckBox 
        onChange={onChange}
        disabled={disabled}
        testID={testID}
        value={value}
        onValueChange={onValueChange}
        style={styles.customInput}
      />
  </View>
  )
  
}
const styles = StyleSheet.create({ 
  
  customInput:{
    backgroundColor: "#f0f8ff",
    marginTop: 10,
    marginVertical: 5,
    // width: 325,
    borderColor: '#e8e8e8',
    // borderWidth: 1,
    // borderRadius: 5,
    paddingVertical: 15,
    paddingLeft: 25,
},
Label:{
    color: 'rgb(0, 122, 255)',
    fontWeight: 'bold',
    marginLeft: 20
    
}
});
export default CheckBoxWithText

 