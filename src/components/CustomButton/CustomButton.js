import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({ onPress, text, type, textColor }) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
      <Text style={[styles.text, styles[`text_${textColor}`]]}>{ text }</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        // width: '100%',
        padding: 15,
        marginVertical: 20,
        borderRadius: 5,
    },
    text:{
        fontWeight: "bold",
        color: "#dc143c",
    },
    container_PRIMARY: {
      backgroundColor:"#87ceeb",
    },
    container_DEFAULT: {
      backgroundColor:"#fffaf0",
    },
    container_Hordecall: {
      backgroundColor:"#ff0000",
    },
    text_Hordecall:{
      color: "#ffffff",
    }
})
export default CustomButton