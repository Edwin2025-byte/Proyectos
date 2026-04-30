import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

const IP_LOCAL = '192.168.0.11'; 

export default function AlumnoHome({ navigation, route }) {
    const { userData } = route.params || {};
    
    // Aseguramos que el ID sea numérico
    const userId = Number(userData?.usuario_id || userData?.estudiante_id || userData?.id);

    const [estudianteinfo, setEstudianteInfo] = useState(null);
    const [logros, setLogros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (userId) {
            cargarTodo();
        }
    }, [userId]);

    const cargarTodo = async () => {
        setLoading(true);
        await Promise.all([fetchDatosPerfil(), fetchLogrosResumen()]);
        setLoading(false);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await Promise.all([fetchDatosPerfil(), fetchLogrosResumen()]);
        setRefreshing(false);
    };

    const fetchDatosPerfil = async () => {
        try {
            const response = await axios.get(`http://${IP_LOCAL}:8000/api/ranking/`);
            
            const miDataReal = response.data.find(u => 
                Number(u.estudiante_id) === userId || Number(u.usuario_id) === userId
            );

            if (miDataReal) {
                setEstudianteInfo(miDataReal);
            }
        } catch (error) {
            console.error("Error al sincronizar perfil:", error);
        }
    };

    const fetchLogrosResumen = async () => {
        try {
            const response = await axios.get(`http://${IP_LOCAL}:8000/api/estudiante-logros/?estudiante_id=${userId}`);
            setLogros(response.data);
        } catch (error) {
            console.error("Error al cargar logros:", error);
        }
    };

    const handleLogout = () => {
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    };

    // --- LÓGICA DE XP ACTUALIZADA (Usa el "xp" del log que enviaste) ---
    const xpActual = Number(estudianteinfo?.experience ?? userData?.xp ?? 0);
    const nivelActual = Number(estudianteinfo?.level ?? userData?.nivel ?? 1);
    
    const progresoNivel = xpActual % 500;
    const porcentajeBarra = Math.min((progresoNivel / 500) * 100, 100);

    return (
        <View style={styles.mainContainer}>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.profileCard}>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Ionicons name="log-out-outline" size={24} color="white" />
                    </TouchableOpacity>

                    <View style={styles.headerContent}>
                        <View style={styles.avatarContainer}>
                            <FontAwesome5 name="user-graduate" size={45} color="white" />
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.welcomeText}>¡Bienvenido de nuevo!</Text>
                            <Text style={styles.userName}>{estudianteinfo?.nombre || userData?.nombre || 'Estudiante'}</Text>
                            <View style={styles.badgeActive}>
                                <View style={styles.dot} />
                                <Text style={styles.userRole}>Estudiante Activo</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* TARJETAS DE ESTADÍSTICAS */}
                <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{logros.length}</Text>
                        <Text style={styles.statLabel}>Logros</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{nivelActual}</Text>
                        <Text style={styles.statLabel}>Nivel</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{xpActual}</Text>
                        <Text style={styles.statLabel}>XP Total</Text>
                    </View>
                </View>

                {/* BARRA DE PROGRESO */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressTextRow}>
                        <Text style={styles.progressLabel}>Progreso de Nivel</Text>
                        <Text style={styles.progressValue}>{progresoNivel} / 500 XP</Text>
                    </View>
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: `${porcentajeBarra}%` }]} />
                    </View>
                </View>

                <TouchableOpacity style={styles.rankingCardButton} onPress={() => navigation.navigate('Ranking')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.trophyIconBg}><Ionicons name="trophy" size={24} color="#FFD700" /></View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#1E293B' }}>Ranking de la Clase</Text>
                            <Text style={{ fontSize: 12, color: '#64748B' }}>Mira tu posición en el grupo</Text>
                        </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
                </TouchableOpacity>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Mis Logros</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Insignias', { userId })}>
                        <Text style={styles.seeAll}>Ver todos</Text>
                    </TouchableOpacity>
                </View>

                {loading && !refreshing ? (
                    <ActivityIndicator size="small" color="#1A3C75" style={{ marginTop: 20 }} />
                ) : (
                    <View style={styles.logrosGrid}>
                        {logros.length > 0 ? (
                            logros.slice(0, 3).map((item) => (
                                <View key={item.id} style={styles.logroCard}>
                                    <View style={[styles.logroCircle, { backgroundColor: item.color || '#3B82F6' }]}>
                                        <Ionicons name={item.icono_url || 'medal'} size={20} color="white" />
                                    </View>
                                    <Text style={styles.logroTitle} numberOfLines={1}>{item.titulo}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.emptyText}>No hay logros aún.</Text>
                        )}
                    </View>
                )}
                <View style={{ height: 40 }} /> 
            </ScrollView>
        </View>
    );
}

// ESTILOS QUE FALTABAN
const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: '#F0F4F8' },
    profileCard: { backgroundColor: '#1A3C75', paddingHorizontal: 25, paddingBottom: 70, paddingTop: 70, borderBottomLeftRadius: 35, borderBottomRightRadius: 35, elevation: 10 },
    headerContent: { flexDirection: 'row', alignItems: 'center' },
    logoutButton: { position: 'absolute', top: 45, right: 25, padding: 8, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12 },
    avatarContainer: { width: 75, height: 75, borderRadius: 37.5, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'white' },
    profileInfo: { marginLeft: 18 },
    welcomeText: { color: 'rgba(255,255,255,0.7)', fontSize: 14 },
    userName: { color: 'white', fontSize: 22, fontWeight: 'bold' },
    badgeActive: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(59, 130, 246, 0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginTop: 5, alignSelf: 'flex-start' },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4ADE80', marginRight: 6 },
    userRole: { color: '#60A5FA', fontSize: 12, fontWeight: 'bold' },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: -35, paddingHorizontal: 15 },
    statBox: { backgroundColor: 'white', padding: 15, borderRadius: 20, width: '30%', alignItems: 'center', elevation: 8 },
    statNumber: { fontSize: 18, fontWeight: 'bold', color: '#1A3C75' },
    statLabel: { color: '#94A3B8', fontSize: 11 },
    progressContainer: { paddingHorizontal: 25, marginTop: 25 },
    progressTextRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    progressLabel: { fontSize: 13, fontWeight: 'bold', color: '#1E293B' },
    progressValue: { fontSize: 12, color: '#64748B' },
    progressBarBg: { height: 12, backgroundColor: '#E2E8F0', borderRadius: 6, overflow: 'hidden' },
    progressBarFill: { height: '100%', backgroundColor: '#4ADE80' },
    rankingCardButton: { backgroundColor: 'white', marginHorizontal: 25, marginTop: 25, padding: 15, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', elevation: 4 },
    trophyIconBg: { width: 45, height: 45, backgroundColor: '#FFFBEB', borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#FEF3C7' },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, marginTop: 30 },
    sectionTitle: { fontSize: 19, fontWeight: 'bold', color: '#1E293B' },
    seeAll: { color: '#3B82F6', fontWeight: 'bold' },
    logrosGrid: { paddingHorizontal: 25, marginTop: 15, flexDirection: 'row', gap: 10 },
    logroCard: { backgroundColor: 'white', padding: 12, borderRadius: 18, width: '30%', alignItems: 'center', elevation: 3 },
    logroCircle: { width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
    logroTitle: { fontSize: 11, fontWeight: 'bold', color: '#334155', textAlign: 'center' },
    emptyText: { color: '#94A3B8', textAlign: 'center', width: '100%', marginTop: 10 }
});