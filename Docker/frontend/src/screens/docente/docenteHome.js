// src/screens/docente/docenteHome.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import HeaderDocente from '../../components/HeaderDocente'; // <-- IMPORTAMOS EL HEADER

export default function DocenteHome() {
  const [selectedTab, setSelectedTab] = useState('Alumnos');

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* HEADER REUTILIZABLE ABAJO DEL STATUSBAR */}
      <HeaderDocente />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* CABECERA AZUL CON PERFIL */}
        <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.blueCard}>
          <View style={styles.profileRow}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} 
              style={styles.profilePic} 
            />
            <View style={styles.headerTextContainer}>
              <Text style={styles.userName}>Perez Barrera Davian Esneider</Text>
              <Text style={styles.userRole}>Docente de Studify</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.body}>
          {/* BUSCADOR */}
          <View style={styles.searchSection}>
            <Ionicons name="search" size={20} color="#64748B" />
            <TextInput 
              placeholder="Buscar Alumno (Nombre/ Codigo)" 
              style={styles.input} 
            />
          </View>

          {/* BOTONES SELECCIONABLES */}
          <View style={styles.categoryRow}>
            {['Alumnos', 'Insignias', 'Ranking'].map((tab) => (
              <TouchableOpacity 
                key={tab}
                onPress={() => setSelectedTab(tab)}
                style={[styles.catButton, selectedTab === tab && styles.catButtonActive]}
              >
                <Text style={[styles.catText, selectedTab === tab && styles.catTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>RESUMEN: {selectedTab.toUpperCase()}</Text>
          <View style={styles.card}>
             <Ionicons 
                name={selectedTab === 'Alumnos' ? 'people' : selectedTab === 'Insignias' ? 'ribbon' : 'trophy'} 
                size={60} 
                color="#2563EB" 
             />
             <Text style={{marginTop: 10, color: '#64748B'}}>Mostrando datos de {selectedTab}...</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  blueCard: {
    padding: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginHorizontal: 15,
    marginTop: 10,
    elevation: 8,
  },
  profileRow: { flexDirection: 'row', alignItems: 'center' },
  profilePic: { width: 70, height: 70, borderRadius: 35, borderWidth: 3, borderColor: '#fff' },
  headerTextContainer: { marginLeft: 15 },
  userName: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  userRole: { color: '#fff', opacity: 0.8 },
  body: { padding: 20 },
  searchSection: { 
    flexDirection: 'row', 
    backgroundColor: '#F1F5F9', 
    padding: 15, 
    borderRadius: 15, 
    alignItems: 'center',
    marginBottom: 20
  },
  input: { marginLeft: 10, flex: 1 },
  categoryRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    backgroundColor: '#F8FAFC',
    borderRadius: 15,
    padding: 5,
    marginBottom: 20
  },
  catButton: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12 },
  catButtonActive: { backgroundColor: '#1A3C75' },
  catText: { color: '#64748B', fontWeight: 'bold' },
  catTextActive: { color: '#fff' },
  sectionTitle: { fontWeight: 'bold', color: '#1E293B', marginBottom: 15, fontSize: 16 },
  card: { 
    backgroundColor: '#fff', 
    padding: 50, 
    borderRadius: 25, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 4
  }
});