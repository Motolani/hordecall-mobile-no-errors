import { View, Text, TextInput } from 'react-native'
import React from 'react'
import styles from '../../../style';

const CustomInput = ({value, setValue, placeholder, secureTextEntry, keyboardType, maxLength}) => {
  return (
    <View>
        <TextInput 
          value={value}
          onChangeText= {setValue}
          placeholder={placeholder}
          style={styles.customInput}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          maxLength={maxLength}
          />
    </View>
  )
}

export default CustomInput