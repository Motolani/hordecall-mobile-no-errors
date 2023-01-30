import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
// import styles from '../../../style';

const InputWithText = ({value, setValue, placeholder, secureTextEntry, keyboardType, maxLength, label, editable, selectTextOnFocus }) => {
  return (
    <View>
        <Text style={styles.Label}>{label}</Text>
        <TextInput 
          value={value}
          onChangeText= {setValue}
          placeholder={placeholder}
          style={styles.customInput}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          maxLength={maxLength}
          editable={editable}
          selectTextOnFocus={selectTextOnFocus}
          />
    </View>
  )
  
}
const styles = StyleSheet.create({ 
  customInput:{
    backgroundColor: "#f0f8ff",
    marginTop: 10,
    marginVertical: 5,
    width: 325,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 15,
    paddingLeft: 25,
},
Label:{
    color: 'rgb(0, 122, 255)',
    fontWeight: 'bold',
    marginLeft: 20
}
});
export default InputWithText

