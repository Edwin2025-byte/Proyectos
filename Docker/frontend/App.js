import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { initDatabase } from './src/baseDatos/db';
import { LoginScreen } from './src/screens/loginScreen';

export default function App() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    async function setup() {
      await initDatabase();
      setDbReady(true);
    }
    setup();
  }, []);

  if (!dbReady) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#1A00FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LoginScreen />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#8ECAFF' }
});
