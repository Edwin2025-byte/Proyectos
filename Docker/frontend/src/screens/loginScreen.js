import React, { useState } from 'react';
import { Text, StyleSheet, View, SafeAreaView, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons'; 
import axios from 'axios';
import CustomInput from '../components/CustomInput'; 
import CustomButton from '../components/CustomButton';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Atención", "Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      const IP_LOCAL = "192.168.0.11"; 
      const response = await axios.post(`http://${IP_LOCAL}:8000/api/usuarios/login/`, {
        email: email.trim(),
        password: password
      });

      const { rol, user } = response.data;
      console.log("Login exitoso, datos usuario:", user);

      if (rol === 'Docente') {
        navigation.navigate('DocenteView', { userData: user });
      } else if (rol === 'Estudiante') {
        navigation.navigate('AlumnoHome', { userData: user });
      } else {
        Alert.alert("Error", "Rol de usuario no reconocido.");
      }

    } catch (error) {
      console.log("Error de conexión:", error);
      const errorMsg = error.response?.data?.error || "No se pudo conectar con el servidor";
      Alert.alert("Error de inicio de sesión", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#C1E1DD', '#A6D8F0']} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <SafeAreaView style={styles.innerContainer}>
            <View style={styles.headerContainer}>
              <FontAwesome5 name="graduation-cap" size={70} color="#1A3B73" />
              <Text style={styles.headerTitle}>Studify</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.welcomeText}>Bienvenidos a nuestra plataforma</Text>
              <Text style={styles.loginTitle}>LOGIN</Text>

              <View style={styles.inputWrapper}>
                <CustomInput
                  iconName="user" 
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />
                <CustomInput
                  iconName="lock"
                  placeholder="Contraseña"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                />
              </View>

              {loading ? (
                <ActivityIndicator size="large" color="#0101FE" style={{ marginTop: 20 }} />
              ) : (
                <CustomButton 
                  title="Ingresar" 
                  onPress={handleLogin} 
                  style={styles.loginButton} 
                />
              )}
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: 'center' },
  innerContainer: { paddingHorizontal: 30, alignItems: 'center' },
  headerContainer: { alignItems: 'center', marginBottom: 30 },
  headerTitle: { fontSize: 40, fontWeight: 'bold', color: '#1A3B73', marginTop: 10 },
  formContainer: { width: '100%', alignItems: 'center' },
  welcomeText: { fontSize: 16, color: '#555', marginBottom: 10 },
  loginTitle: { fontSize: 28, fontWeight: 'bold', color: '#000', marginBottom: 30 },
  inputWrapper: { width: '100%', marginBottom: 10 },
  loginButton: {
    backgroundColor: '#0101FE',
    width: '100%',
    borderRadius: 30,
    marginTop: 15,
    height: 55,
    justifyContent: 'center',
  },
});

// ¡ESTA LÍNEA ES LA QUE CORRIGE EL ERROR!
export default LoginScreen;