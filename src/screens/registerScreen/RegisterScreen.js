import { View, Text, Image, useWindowDimensions, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useState}  from 'react'
import Logo from '../../../assets/images/img.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { Button } from "@rneui/themed";

const RegisterScreen = () => {
    const { height } = useWindowDimensions();
  
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const onSignUpPressed = () => {
    console.warn("Sign up");
  }
    
  return (
    <View style={styles.container}>
        <Image 
          source={Logo} 
          style={[styles.logo, {height: height * 0.3}]} 
          resizeMode="contain" 
        />
        <CustomInput 
        placeholder="Enter Fullname" 
        value={phonenumber} 
        setValue={setFullname} />
        
        <CustomInput 
        placeholder="Enter Email" 
        value={phonenumber} 
        setValue={setEmail} />
        
        <CustomInput 
        placeholder="Phone Number" 
        value={phonenumber} 
        setValue={setPhonenumber} 
        keyboardType={'numeric'}
        maxLength={11} />
        
        <CustomInput 
        placeholder="Password" 
        value={password} 
        setValue={setPassword} 
        secureTextEntry={true} />
        
        <CustomInput 
        placeholder="Confirm Password" 
        value={password} 
        setValue={confirmPassword} 
        secureTextEntry={true} />
        
        <CustomButton 
        text="Register" 
        onPress={onSignUpPressed} 
        type="PRIMARY"/>
      
      <View style={styles.SiginRegisterButtonView}>
        <Text style={styles.SigInText}> Already have an account? </Text>
        <TouchableOpacity>
          <Button style={styles.SigupRegisterButtonView} size="sm" type="clear">
            Sign in
          </Button> 
        </TouchableOpacity>
        
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
    logo:{
      marginTop: 10,
      // width: 150,
      maxWidth: 300,
      maxHeight: 150,
      marginBottom: 35,
    },
    pwdForgot:{
      paddingBottom: 25
    },
    SiginRegisterButtonView:{
        flexDirection: 'row',
        marginTop: 20,
        alignContent: "center",
    },
    SigupRegisterButtonView:{
      marginTop: -8,
    },
    container:{
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#ff0000",
  },
  registerButton:{
    backgroundColor: '#87ceeb',
  }, 
  SigInText:{
    color:'#f8f8ff',
  }
  })

export default RegisterScreen