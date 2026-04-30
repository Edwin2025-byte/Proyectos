// Ubicación: src/screens/RankingScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const IP_LOCAL = '192.168.0.11'; 

export default function RankingScreen({ navigation, route }) {
    const { userId } = route.params || {}; // El ID del usuario que hizo login
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchRanking = async () => {
        try {
            const response = await axios.get(`http://${IP_LOCAL}:8000/api/estudiantes/ranking/`);
            setRanking(response.data);
        } catch (error) {
            console.error("Error al cargar ranking:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => { fetchRanking(); }, []);

    const renderItem = ({ item, index }) => {
        const isMe = Number(item.usuario_id) === Number(userId);
        const trophyColor = index === 0 ? "#FFD700" : index === 1 ? "#94A3B8" : index === 2 ? "#B45309" : "#64748B";

        return (
            <View style={[styles.card, isMe && styles.myCard]}>
                <View style={styles.left}>
                    <Text style={[styles.rank, { color: trophyColor }]}>#{index + 1}</Text>
                    <View style={styles.avatar}>
                        <Ionicons name={index < 3 ? "trophy" : "person"} size={22} color={trophyColor} />
                    </View>
                    <View>
                        <Text style={styles.name}>{item.nombre} {isMe ? "(Tú)" : ""}</Text>
                        <Text style={styles.level}>Nivel {item.nivel}</Text>
                    </View>
                </View>
                <View style={styles.right}>
                    <Text style={styles.xp}>{item.xp_actual}</Text>
                    <Text style={styles.xpLabel}>PUNTOS XP</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Ranking de Estudiantes</Text>
                <View style={{ width: 24 }} />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#1A3C75" style={{ marginTop: 50 }} />
            ) : (
                <FlatList
                    data={ranking}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.estudiante_id.toString()}
                    contentContainerStyle={{ padding: 15 }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchRanking} />}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    header: { backgroundColor: '#1A3C75', height: 100, paddingTop: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
    title: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    card: { backgroundColor: 'white', borderRadius: 15, padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, elevation: 3 },
    myCard: { borderColor: '#1A3C75', borderWidth: 2, backgroundColor: '#E0F2FE' },
    left: { flexDirection: 'row', alignItems: 'center' },
    rank: { fontSize: 18, fontWeight: 'bold', width: 40 },
    avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    name: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
    level: { fontSize: 12, color: '#94A3B8' },
    right: { alignItems: 'flex-end' },
    xp: { fontSize: 16, fontWeight: 'bold', color: '#1A3C75' },
    xpLabel: { fontSize: 10, color: '#94A3B8', fontWeight: 'bold' }
});