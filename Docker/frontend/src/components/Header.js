import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Studify</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 50, marginBottom: 20 },
  title: { fontSize: 40, fontWeight: 'bold', color: '#1A3C75' },
});

// ESTA LÍNEA ES VITAL:
export default Header;