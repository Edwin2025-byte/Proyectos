import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons'; // Usaremos iconos más limpios

const CustomInput = ({ iconName, placeholder, secureTextEntry, ...props }) => {
  return (
    <View style={styles.container}>
      <SimpleLineIcons name={iconName} size={20} color="#999" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#B0B0B0"
        secureTextEntry={secureTextEntry}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Fondo blanco para el input
    borderRadius: 30,           // Bordes totalmente redondeados
    paddingHorizontal: 20,
    marginBottom: 15,
    height: 60,                // Un poco más alto para dar aire
    width: '100%',
    // Sombra suave (solo Android, para iOS se necesitan más propiedades)
    elevation: 2, 
  },
  icon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
  },
});

export default CustomInput;