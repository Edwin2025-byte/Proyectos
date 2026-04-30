import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen({ navigation }) {
  // Datos de prueba (Luego los conectaremos al axios que ya probamos)
  const userStats = { nombre: "Usuario Studify", nivel: 5, xp: 1250, oro: 300 };

  const MenuCard = ({ title, icon, color, onPress, subtitle }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={[styles.iconCircle, { backgroundColor: color }]}>
        <Ionicons name={icon} size={28} color="white" />
      </View>
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#CCC" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        
        {/* CABECERA DE PERFIL */}
        <View style={styles.header}>
          <View style={styles.avatarPlaceholder}>
             <Ionicons name="person" size={40} color="#1A3C75" />
          </View>
          <View>
            <Text style={styles.welcome}>Hola, {userStats.nombre}</Text>
            <Text style={styles.levelBadge}>Nivel {userStats.nivel} • Estudiante Pro</Text>
          </View>
        </View>

        {/* STATS RÁPIDOS */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{userStats.xp}</Text>
            <Text style={styles.statLabel}>XP Total</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: '#EAB308' }]}>{userStats.oro}</Text>
            <Text style={styles.statLabel}>Puntos Oro</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Mi Aprendizaje</Text>

        {/* BOTONES DE NAVEGACIÓN */}
        <MenuCard 
          title="Mis Cursos" 
          subtitle="Continúa donde te quedaste"
          icon="book" 
          color="#3B82F6" 
          onPress={() => console.log("Ir a Cursos")} 
        />
        <MenuCard 
          title="Tareas Pendientes" 
          subtitle="3 entregas para esta semana"
          icon="clipboard" 
          color="#EF4444" 
          onPress={() => console.log("Ir a Tareas")} 
        />
        <MenuCard 
          title="Mis Insignias" 
          subtitle="Ver mis logros obtenidos"
          icon="medal" 
          color="#10B981" 
          onPress={() => navigation.navigate('Insignias')} 
        />
        <MenuCard 
          title="Pagos y Suscripción" 
          subtitle="Estado de tu plan actual"
          icon="wallet" 
          color="#8B5CF6" 
          onPress={() => console.log("Ir a Pagos")} 
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 25, marginTop: 10 },
  avatarPlaceholder: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  welcome: { fontSize: 22, fontWeight: 'bold', color: '#1E293B' },
  levelBadge: { fontSize: 14, color: '#64748B' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  statBox: { backgroundColor: 'white', padding: 15, borderRadius: 15, width: '48%', alignItems: 'center', elevation: 2 },
  statNumber: { fontSize: 20, fontWeight: 'bold', color: '#1A3C75' },
  statLabel: { fontSize: 12, color: '#64748B' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#1E293B' },
  card: { flexDirection: 'row', backgroundColor: 'white', padding: 15, borderRadius: 15, alignItems: 'center', marginBottom: 12, elevation: 1 },
  iconCircle: { width: 50, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  cardText: { flex: 1, marginLeft: 15 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  cardSubtitle: { fontSize: 12, color: '#64748B' }
});