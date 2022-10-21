import { View, Text, Image, useWindowDimensions, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useState}  from 'react'
import Logo from '../../../assets/images/img.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { Button } from "@rneui/themed";

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const onSignInPressed = () => {
    console.warn("Sign in");
  }
  
  return (
    <View style={styles.container}>
        <Image 
          source={Logo} 
          style={[styles.logo, {height: height * 0.3}]} 
          resizeMode="contain" 
        />
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
        
      <CustomButton 
        text="Sign In" 
        onPress={onSignInPressed} 
        type="PRIMARY" />
      
      <Button size="sm" type="clear" style={styles.pwdForgot} >
        Forgot Password?
      </Button>
      
      <View style={styles.SiginRegisterButtonView}>
        <Text style={styles.SignUpText}> Don't have an Account? </Text>
        <TouchableOpacity>
          <Button  style={styles.SigupRegisterButtonView} size="sm" type="clear">
            Sign up
          </Button> 
        </TouchableOpacity>
        
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  logo:{
    marginTop: 20,
    // width: 150,
    maxWidth: 300,
    maxHeight: 150,
    marginBottom: 65,
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
SignUpText:{
  color:'#f8f8ff',
}
})
export default SignInScreen