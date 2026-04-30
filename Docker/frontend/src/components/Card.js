import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#D9D9D9', // Fondo gris de la tarjeta
    borderRadius: 25,           // Bordes redondeados
    padding: 25,               // Espaciado interno
    width: '100%',             // Ocupa todo el ancho disponible
    maxWidth: 400,             // Ancho máximo para pantallas grandes
    elevation: 8,              // Sombra en Android
    shadowColor: '#000',       // Color de la sombra (iOS)
    shadowOffset: { width: 0, height: 4 }, // Desplazamiento de la sombra (iOS)
    shadowOpacity: 0.3,        // Opacidad de la sombra (iOS)
    shadowRadius: 6,           // Radio de la sombra (iOS)
    // ESTO ES CLAVE: Asegura que el contenido interno no se salga de los bordes redondeados
    overflow: 'hidden', 
    alignItems: 'center',      // Centra el contenido horizontalmente
  },
});

export default Card;