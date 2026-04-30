import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const IP_LOCAL = '192.168.0.11'; 

export default function InsigniasScreen({ route }) {
  // Intentamos obtener el ID del usuario de ambas formas posibles
  const userId = route.params?.userId || route.params?.userData?.usuario_id || route.params?.userData?.id; 

  const [insignias, setInsignias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchInsignias();
    } else {
      console.log("No se detectó userId en InsigniasScreen");
      setLoading(false);
    }
  }, [userId]);

  const fetchInsignias = async () => {
    try {
      setLoading(true);
      // URL con el ID del usuario actual
      const url = `http://${IP_LOCAL}:8000/api/estudiante-logros/?estudiante_id=${userId}`;
      const response = await axios.get(url);
      setInsignias(response.data);
    } catch (error) {
      console.error("Error en la petición:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: item.color || '#1A3C75' }]}>
        <Ionicons name={item.icono_url || 'medal'} size={30} color="white" />
      </View>
      <View style={styles.info}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.desc}>{item.descripcion}</Text>
        <Text style={styles.puntos}>+{item.puntos_premio} XP</Text>
      </View>
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color="#1A3C75" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={insignias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.empty}>Aún no tienes insignias registradas.</Text>
            <Text style={styles.debug}>ID detectado: {userId || 'Ninguno'}</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 15 },
  card: { flexDirection: 'row', backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 10, elevation: 2 },
  iconContainer: { width: 55, height: 55, borderRadius: 27.5, justifyContent: 'center', alignItems: 'center' },
  info: { marginLeft: 15, flex: 1 },
  titulo: { fontSize: 16, fontWeight: 'bold', color: '#1A3C75' },
  desc: { fontSize: 13, color: '#64748B' },
  puntos: { fontSize: 13, fontWeight: 'bold', color: '#10B981', marginTop: 5 },
  emptyContainer: { alignItems: 'center', marginTop: 50 },
  empty: { color: '#64748B', fontSize: 16 },
  debug: { color: '#CBD5E1', fontSize: 10, marginTop: 10 }
});