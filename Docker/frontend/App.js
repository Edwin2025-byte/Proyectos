import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

// IMPORTACIÓN DE TUS VISTAS REALES
import LoginScreen from './src/screens/loginScreen'; 
import DocenteHome from './src/screens/docente/docenteHome'; 

// VISTAS DEL ALUMNO
import AlumnoHome from './src/screens/estudiante/alumnoHome'; 
import InsigniasScreen from './src/screens/estudiante/InsigniasScreen'; 
// AGREGAMOS ESTA IMPORTACIÓN:
import RankingScreen from './src/screens/estudiante/RankingScreen'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {/* 1. Pantalla de Inicio / Login */}
        <Stack.Screen name="Login" component={LoginScreen} />
        
        {/* 2. Vista del Docente */}
        <Stack.Screen name="DocenteView" component={DocenteHome} />
        
        {/* 3. Vista Principal del Alumno */}
        <Stack.Screen name="AlumnoHome" component={AlumnoHome} />
        
        {/* 4. Pantalla de Insignias */}
        <Stack.Screen 
          name="Insignias" 
          component={InsigniasScreen} 
          options={{ 
            headerShown: true, 
            title: 'Mis Logros',
            headerStyle: { backgroundColor: '#3B82F6' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }} 
        />

        {/* 5. NUEVA: Pantalla de Ranking (Competencia Sana) */}
        <Stack.Screen 
          name="Ranking" 
          component={RankingScreen} 
          options={{ 
            headerShown: true, 
            title: 'Tabla de Posiciones',
            headerStyle: { backgroundColor: '#1A3C75' }, // Un azul más oscuro para diferenciar
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}