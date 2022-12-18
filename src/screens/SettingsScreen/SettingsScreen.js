import { View, Text } from 'react-native'
import React, {useContext} from 'react'
import CustomButton from '../../components/CustomButton';
import { AuthContext } from '../../context/AuthContext';

const SettingsScreen = ({navigation}) => {
  const { logout } = useContext(AuthContext);

  return (
    <View>
      <Text>SettingsScreen</Text>
      <CustomButton 
        text="Logout" 
        onPress={() => {logout()}} 
        type="PRIMARY" />
        
        <CustomButton 
        text="Record Voice" 
        onPress={() => navigation.navigate("RecordVoice")} 
        type="PRIMARY" />
    </View>
  );
};

export default SettingsScreen;