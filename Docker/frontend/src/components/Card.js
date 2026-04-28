import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 25,
    padding: 20,
    width: '90%',
    alignSelf: 'center',
    elevation: 5, // Sombra para Android
  },
});

export default Card;