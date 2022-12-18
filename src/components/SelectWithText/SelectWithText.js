import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
// import styles from '../../../style';

const SelectWithText = ({textlabel, data, save, label }) => {
  const [selected, setSelected] = useState('');
  return (

    <View style={styles.container}>
      <Text style={styles.Label}>{textlabel}</Text>
      <SelectList 
        label={label}
        data={data}
        setSelected={(val) => setSelected(val)} 
        save={save}
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
    // borderColor: '#e8e8e8',
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
export default SelectWithText

