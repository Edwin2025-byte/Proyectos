import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Header from '../../components/Header';
import { CustomText } from '../../components/CustomText';
import { Imagen } from '../../components/Imagen';

const LoginLayout = ({ children }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* El Navbar/Header como parte del Layout */}
          <Header />
          
          {/* Aquí se renderizará el contenido de la pantalla (Login, Registro, etc.) */}
          <View style={styles.content}>
            {children}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8ECAFF', // Fondo azul global
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginLayout;