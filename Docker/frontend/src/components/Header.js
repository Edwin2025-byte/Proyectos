import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image 
          source={""} // Asegúrate de que el nombre coincida
          style={styles.image}
          
        />
        <Text style={styles.title}>Studify</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1A3C75', // Azul oscuro institucional
    marginLeft: 10,
  },
});

export default Header;