import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Platform, StatusBar, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Importamos la navegación

export default function HeaderDocente() {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres salir?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Salir", 
          onPress: () => navigation.navigate('Login'), // Te manda de vuelta al Login
          style: "destructive" 
        }
      ]
    );
  };

  return (
    <View style={styles.safeAreaCustom}>
      <View style={styles.topBar}>
        <Image 
          source={require('../../assets/images/Studify.png')} 
          style={styles.logoTop} 
        />
        
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={24} color="#1A3C75" />
          </TouchableOpacity>

          {/* BOTÓN DE CERRAR SESIÓN */}
          <TouchableOpacity style={styles.iconBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeAreaCustom: {
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10, 
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  logoTop: { width: 110, height: 40, resizeMode: 'contain' },
  rightIcons: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { marginLeft: 15 }
});