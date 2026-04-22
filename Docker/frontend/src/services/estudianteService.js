// src/services/estudianteService.js

import api from "./api";


// =====================================
// OBTENER TODOS LOS ESTUDIANTES
// =====================================
export const getEstudiantes = async () => {
  try {
    const response = await api.get("estudiantes/");
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener estudiantes:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// OBTENER ESTUDIANTE POR ID
// =====================================
export const getEstudianteById = async (id) => {
  try {
    const response = await api.get(`estudiantes/${id}/`);
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener estudiante:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// CREAR NUEVO ESTUDIANTE
// =====================================
export const createEstudiante = async (estudianteData) => {
  try {
    const response = await api.post("estudiantes/", estudianteData);
    return response.data;
  } catch (error) {
    console.log(
      "Error al crear estudiante:",
      error.response?.data || error.message
    );
    throw error;
  }
};


/*
Ejemplo de estudianteData:

{
  usuario: 1,
  xp_actual: 250,
  puntos_oro: 100,
  nivel: 2,
  avatar_url: "https://misitio.com/avatars/avatar1.png",
  estado: true
}
*/


// =====================================
// ACTUALIZAR ESTUDIANTE COMPLETO (PUT)
// =====================================
export const updateEstudiante = async (id, estudianteData) => {
  try {
    const response = await api.put(
      `estudiantes/${id}/`,
      estudianteData
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error al actualizar estudiante:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// ACTUALIZACIÓN PARCIAL (PATCH)
// =====================================
export const patchEstudiante = async (id, estudianteData) => {
  try {
    const response = await api.patch(
      `estudiantes/${id}/`,
      estudianteData
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error en actualización parcial:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// ELIMINAR ESTUDIANTE
// =====================================
export const deleteEstudiante = async (id) => {
  try {
    await api.delete(`estudiantes/${id}/`);
    return true;
  } catch (error) {
    console.log(
      "Error al eliminar estudiante:",
      error.response?.data || error.message
    );
    throw error;
  }
};