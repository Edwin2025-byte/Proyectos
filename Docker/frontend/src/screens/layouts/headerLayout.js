import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Header from '../../components/Header'; 

const LoginLayout = ({ children }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scroll}>
      <Header />
      <View style={styles.content}>{children}</View>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#8ECAFF' },
  scroll: { flexGrow: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 50 },
});
r
export default LoginLayout;