import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import HeaderDocente from '../../components/HeaderDocente';
import axios from 'axios';

export default function DocenteHome({ route }) {
  const [selectedTab, setSelectedTab] = useState('Alumnos');
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const { userData } = route.params || { userData: { nombre: 'Docente', email: '' } };
  const IP_LOCAL = "192.168.0.11"; 

  useEffect(() => {
    if (selectedTab === 'Alumnos') {
      fetchAlumnos();
    }
  }, [selectedTab]);

  const fetchAlumnos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://${IP_LOCAL}:8000/api/usuarios/estudiantes/`);
      setAlumnos(response.data);
    } catch (error) {
      console.log("Error al obtener alumnos", error);
    } finally {
      setLoading(false);
    }
  };

  // --- FUNCIÓN ACTUALIZADA CON CONEXIÓN REAL ---
  const asignarPuntos = async (alumno, logroId) => {
    try {
      const response = await axios.post(`http://${IP_LOCAL}:8000/api/usuarios/asignar-logro/`, {
        usuario_id: alumno.usuario_id,
        logro_id: logroId,
      });

      if (response.status === 200 || response.status === 201) {
        Alert.alert(
          "¡Éxito!", 
          `${alumno.nombre_completo.split(' ')[0]} ha recibido sus puntos correctamente.`
        );
        // Volvemos a cargar la lista para que el XP y el Nivel se actualicen en pantalla
        fetchAlumnos(); 
      }
    } catch (error) {
      console.log("Error al asignar puntos:", error.response?.data || error.message);
      Alert.alert("Error", "No se pudo conectar con el servidor para asignar los puntos.");
    }
  };

  const darPremio = (alumno) => {
    Alert.alert(
      "Premiar a " + alumno.nombre_completo,
      "Selecciona un incentivo de gamificación:",
      [
        { text: "⭐ Buen Comportamiento", onPress: () => asignarPuntos(alumno, 1) },
        { text: "📚 Tarea Completa", onPress: () => asignarPuntos(alumno, 2) },
        { text: "Cancelar", style: "cancel" }
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <HeaderDocente />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
        <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.blueCard}>
          <View style={styles.profileRow}>
            <Image 
              source={{ uri: `https://ui-avatars.com/api/?name=${userData.nombre}&background=random` }} 
              style={styles.profilePic} 
            />
            <View style={styles.headerTextContainer}>
              <Text style={styles.userName}>{userData.nombre}</Text>
              <Text style={styles.userRole}>Docente de Studify</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.body}>
          <View style={styles.searchSection}>
            <Ionicons name="search" size={20} color="#64748B" />
            <TextInput 
              placeholder="Buscar Alumno (Nombre/ Codigo)" 
              style={styles.input} 
            />
          </View>

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

          <View style={[styles.card, selectedTab === 'Alumnos' && alumnos.length > 0 && { padding: 10 }]}>
            {loading ? (
              <ActivityIndicator size="large" color="#2563EB" style={{padding: 20}} />
            ) : selectedTab === 'Alumnos' ? (
              alumnos.length > 0 ? (
                alumnos.map((alumno) => (
                  <View key={alumno.usuario_id} style={styles.alumnoRow}>
                    <View style={styles.alumnoInfo}>
                      <Text style={styles.alumnoName}>{alumno.nombre_completo}</Text>
                      {/* Aquí mostramos el XP y Nivel que vienen de la BD */}
                      <Text style={styles.alumnoXP}>
                        Nivel {alumno.nivel || 1} • {alumno.xp || 0} XP
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => darPremio(alumno)} style={styles.trophyBtn}>
                      <MaterialCommunityIcons name="trophy-variant" size={24} color="#2563EB" />
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <View style={styles.emptyState}>
                  <Ionicons name="people" size={60} color="#2563EB" />
                  <Text style={styles.emptyText}>No hay alumnos registrados</Text>
                </View>
              )
            ) : (
              <View style={styles.emptyState}>
                <Ionicons 
                  name={selectedTab === 'Insignias' ? 'ribbon' : 'trophy'} 
                  size={60} 
                  color="#2563EB" 
                />
                <Text style={styles.emptyText}>
                  Hola {userData.nombre.split(' ')[0]}, mostrando datos de {selectedTab}...
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={{height: 30}} /> 
      </ScrollView>
    </View>
  );
}

// ... (los estilos se mantienen igual a como los tenías)
const styles = StyleSheet.create({
  blueCard: { padding: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginHorizontal: 15, marginTop: 10, elevation: 8 },
  profileRow: { flexDirection: 'row', alignItems: 'center' },
  profilePic: { width: 70, height: 70, borderRadius: 35, borderWidth: 3, borderColor: '#fff' },
  headerTextContainer: { marginLeft: 15 },
  userName: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  userRole: { color: '#fff', opacity: 0.8 },
  body: { padding: 20 },
  searchSection: { flexDirection: 'row', backgroundColor: '#F1F5F9', padding: 15, borderRadius: 15, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  input: { marginLeft: 10, flex: 1, color: '#1E293B' },
  categoryRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#F1F5F9', borderRadius: 15, padding: 5, marginBottom: 20 },
  catButton: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12 },
  catButtonActive: { backgroundColor: '#1A3C75' },
  catText: { color: '#64748B', fontWeight: 'bold' },
  catTextActive: { color: '#fff' },
  sectionTitle: { fontWeight: 'bold', color: '#1E293B', marginBottom: 15, fontSize: 16 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 25, borderWidth: 1, borderColor: '#F1F5F9', elevation: 4 },
  alumnoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingVertical: 15, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  alumnoInfo: { flex: 1 },
  alumnoName: { fontWeight: 'bold', color: '#1E293B', fontSize: 16 },
  alumnoXP: { color: '#64748B', fontSize: 13, marginTop: 2 },
  trophyBtn: { padding: 10, backgroundColor: '#EFF6FF', borderRadius: 12 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40, width: '100%' },
  emptyText: { marginTop: 15, color: '#64748B', textAlign: 'center', fontSize: 14, paddingHorizontal: 20 }
});