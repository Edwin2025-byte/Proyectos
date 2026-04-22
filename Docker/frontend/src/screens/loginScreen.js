import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import LoginLayout from './layouts/headerLayout';
import Card from '../components/Card';
import CustomInput from '../components/CustomInput';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import Imagen from '../components/Imagen';

const LoginScreen = () => {
  return (
    <LoginLayout>
      <Card>
        <Text style={styles.welcomeText}>Bienvenidos a nuestra plataforma</Text>
        <Text style={styles.title}>LOGIN</Text>

        <CustomInput 
          placeholder="Username" 
          iconName="account-outline" 
        />
        
        <CustomInput 
          placeholder="Password" 
          iconName="lock-outline" 
          secureTextEntry 
        />

        <CustomButton 
          title="Ingresar" 
          onPress={() => console.log('Accediendo...')} 
        />

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>Login with Others</Text>
          <View style={styles.line} />
        </View>

        <CustomButton 
          type="social" 
          title="Login with Google" 
          iconSource={""} 
        />
        
        <CustomButton 
          type="social" 
          title="Login with Facebook" 
          iconSource={""} 
        />
      </Card>
    </LoginLayout>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#999',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#555',
    fontSize: 14,
  },
});

export default LoginScreen;