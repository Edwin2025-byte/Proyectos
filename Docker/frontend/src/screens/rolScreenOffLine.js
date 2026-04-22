import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import LoginLayout from './layouts/headerLayout';
import Card from '../components/Card';
import { getRoles } from '../services/rolLocalService';

const RolesScreen = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarRoles();
  }, []);

  const cargarRoles = async () => {
    try {
      setLoading(true);
      const data = await getRoles();
      setRoles(data);
    } catch (error) {
      console.log('Error cargando roles locales:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.headerText, styles.idColumn]}>ID</Text>
      <Text style={[styles.headerText, styles.nameColumn]}>Nombre del Rol</Text>
      <Text style={[styles.headerText, styles.statusColumn]}>Estado</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.cellText, styles.idColumn]}>
        {item.rol_id}
      </Text>

      <Text style={[styles.cellText, styles.nameColumn]}>
        {item.nombre_rol}
      </Text>

      <Text style={[styles.cellText, styles.statusColumn]}>
        {item.estado ? 'Activo' : 'Inactivo'}
      </Text>
    </View>
  );

  return (
    <LoginLayout>
      <Card>
        <Text style={styles.title}>Lista de Roles (Offline)</Text>

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" />
            <Text>Cargando roles...</Text>
          </View>
        ) : (
          <>
            {renderHeader()}

            <FlatList
              data={roles}
              keyExtractor={(item) => item.rol_id.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  No hay roles registrados
                </Text>
              }
            />
          </>
        )}
      </Card>
    </LoginLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 8,
  },

  tableRow: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 8,
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#111',
  },

  cellText: {
    fontSize: 14,
    color: '#444',
  },

  idColumn: {
    flex: 0.8,
  },

  nameColumn: {
    flex: 2,
  },

  statusColumn: {
    flex: 1,
  },

  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 15,
    color: '#666',
  },
});

export default RolesScreen;
