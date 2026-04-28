import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// 1. IMPORTACIÓN DE TU VISTA REAL
// Asegúrate de que la ruta sea exactamente: src/screens/docente/docenteHome.js
import DocenteHome from './src/screens/docente/docenteHome'; 

// --- VISTA TEMPORAL ALUMNO ---
function AlumnoScreen() {
  return (
    <View style={styles.centerContainer}>
      <Ionicons name="school-outline" size={100} color="#1A3C75" />
      <Text style={styles.welcomeText}>Panel de Alumno</Text>
      <Text>Bienvenido a Studify</Text>
    </View>
  );
}

// --- VISTA LOGIN ---
function LoginScreen({ navigation }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Convertimos a minúsculas para evitar errores de escritura
    const lowerUser = user.toLowerCase().trim();

    if (lowerUser === 'admin' && password === '1234') {
      navigation.navigate('AlumnoHome'); 
    } 
    else if (lowerUser === 'docente' && password === '1234') {
      // ESTO ES LO QUE ESTABA MAL: Ahora apunta a la pantalla real
      navigation.navigate('DocenteView'); 
    } 
    else {
      Alert.alert('Error', 'Prueba con: docente / 1234');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#A8E6CF', '#8ECAFF']} style={styles.background} />
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('./assets/images/Studify.png')} 
            style={styles.logoImagen} 
          />
        </View>

        <Text style={styles.loginTitle}>LOGIN</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
          <TextInput 
            placeholder="Usuario" 
            style={styles.input} 
            onChangeText={setUser} 
            value={user} 
            placeholderTextColor="#666"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
          <TextInput 
            placeholder="Contraseña" 
            style={styles.input} 
            secureTextEntry 
            onChangeText={setPassword} 
            value={password} 
            placeholderTextColor="#666"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

// --- NAVEGADOR PRINCIPAL ---
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AlumnoHome" component={AlumnoScreen} />
        
        {/* AQUÍ CONECTAMOS TU ARCHIVO EXTERNO */}
        <Stack.Screen name="DocenteView" component={DocenteHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  content: { flex: 1, padding: 25, justifyContent: 'center', alignItems: 'center' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#1A3C75', marginTop: 20 },
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  logoImagen: { width: 300, height: 190, resizeMode: 'contain' },
  loginTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    borderRadius: 25, 
    width: '100%', 
    height: 50, 
    marginBottom: 15, 
    paddingHorizontal: 15,
    elevation: 3
  },
  icon: { marginRight: 10 },
  input: { flex: 1, height: '100%' },
  button: { 
    backgroundColor: '#2000FF', 
    width: '60%', 
    height: 45, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 10 
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});