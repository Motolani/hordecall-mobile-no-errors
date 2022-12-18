import { View, Text, Image, useWindowDimensions, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import React, {useContext, useState}  from 'react'
import Logo from '../../../assets/images/img.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { Button } from "@rneui/themed";
import { AuthContext } from '../../context/AuthContext';

const SignInScreen = ({navigation}) => {
  const { height } = useWindowDimensions();
  
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login, errorMessage } = useContext(AuthContext);
  
  const onSubmit = async() => {
    await login(email, password); 
    console.log(email, password);
    
  }
  
  
  return (
    <View style={styles.container}>
        <Image 
          source={Logo} 
          style={[styles.logo, {height: height * 0.3}]} 
          resizeMode="contain" 
        />
        
        {errorMessage && <Text style={styles.failedMessage}>{errorMessage}</Text>}
        
        <CustomInput 
        placeholder="email" 
        value={email} 
        setValue={setemail} 
        // keyboardType={'numeric'}
        // maxLength={11} 
        />
        
      <CustomInput 
        placeholder="Password" 
        value={password} 
        setValue={setPassword} 
        secureTextEntry={true} />
        
      <CustomButton 
        text="Login" 
        onPress={onSubmit} 
        type="PRIMARY" />
      
      <Button size="sm" type="clear" style={styles.pwdForgot} >
        Forgot Password?
      </Button>
      
      <View style={styles.SiginRegisterButtonView}>
        <Text style={styles.SignUpText}> Don't have an Account? </Text>
        <TouchableOpacity>
          <Button onPress={() => navigation.navigate('Register')} style={styles.SigupRegisterButtonView} size="sm" type="clear">
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
  },
  failedMessage:{
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  }
})
export default SignInScreen