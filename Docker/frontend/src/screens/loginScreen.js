import React from 'react';
import { Text, StyleSheet } from 'react-native';
import LoginLayout from './layouts/headerLayout';
import Card from '../components/Card';

const LoginScreen = () => {
  return (
    <LoginLayout>
      <Card>
        <Text style={styles.title}>¡Bienvenido!</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
        
        {/* Aquí irán tus CustomInputs y CustomButtons después */}
        
      </Card>
    </LoginLayout>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#1A3C75' },
  subtitle: { fontSize: 16, textAlign: 'center', color: '#444', marginBottom: 20 },
});

export default LoginScreen;