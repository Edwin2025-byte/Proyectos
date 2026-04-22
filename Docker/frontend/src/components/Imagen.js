import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const Imagen = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={""} // Asegúrate de tener el archivo
        style={styles.logoImage}
        resizeMode="contain"
      />
      <Text style={styles.title}>Studify</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  logoImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#1A3C75', // Azul oscuro de Studify
  },
});

export default Header;