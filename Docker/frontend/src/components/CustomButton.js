import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

const CustomButton = ({ title, onPress, variant = 'primary', iconSource, style }) => {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[styles.button, isPrimary ? styles.btnPrimary : styles.btnSocial]}>
        
      <View style={styles.content}>
        {iconSource && <Image source={iconSource} style={styles.icon} />}
        <Text style={[styles.text, isPrimary ? styles.textPrimary : styles.textSocial]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    marginVertical: 8,
  },
  btnPrimary: {
    backgroundColor: '#1A00FF', // El azul intenso de la imagen
    width: '65%',
    alignSelf: 'center',
    elevation: 3,
  },
  btnSocial: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#4A90E2',
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textPrimary: { color: '#FFF' },
  textSocial: { color: '#333' },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
});

export default CustomButton;