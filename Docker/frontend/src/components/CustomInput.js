import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const CustomInput = ({ iconName, placeholder, secureTextEntry, ...props }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={iconName} size={22} color="#555" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#7a7a7a"
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
    backgroundColor: '#DCE7FF', // Azul claro de los inputs
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 55,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default CustomInput;