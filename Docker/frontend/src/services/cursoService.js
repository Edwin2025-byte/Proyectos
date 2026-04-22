// src/services/cursoService.js

import api from "./api";


// =====================================
// OBTENER TODOS LOS CURSOS
// =====================================
export const getCursos = async () => {
  try {
    const response = await api.get("cursos/");
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener cursos:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// OBTENER CURSO POR ID
// =====================================
export const getCursoById = async (id) => {
  try {
    const response = await api.get(`cursos/${id}/`);
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener curso:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// CREAR NUEVO CURSO
// =====================================
export const createCurso = async (cursoData) => {
  try {
    const response = await api.post("cursos/", cursoData);
    return response.data;
  } catch (error) {
    console.log(
      "Error al crear curso:",
      error.response?.data || error.message
    );
    throw error;
  }
};


/*
Ejemplo de cursoData:

{
  profesor: 1,
  nombre_clase: "React Native Avanzado",
  descripcion: "Curso completo de desarrollo móvil",
  codigo_acceso: "RN2026",
  imagen_url: "https://misitio.com/cursos/react-native.png",
  duracion_horas: 40,
  es_premium: true,
  estado: true
}
*/


// =====================================
// ACTUALIZAR CURSO COMPLETO (PUT)
// =====================================
export const updateCurso = async (id, cursoData) => {
  try {
    const response = await api.put(
      `cursos/${id}/`,
      cursoData
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error al actualizar curso:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// ACTUALIZACIÓN PARCIAL (PATCH)
// =====================================
export const patchCurso = async (id, cursoData) => {
  try {
    const response = await api.patch(
      `cursos/${id}/`,
      cursoData
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
// ELIMINAR CURSO
// =====================================
export const deleteCurso = async (id) => {
  try {
    await api.delete(`cursos/${id}/`);
    return true;
  } catch (error) {
    console.log(
      "Error al eliminar curso:",
      error.response?.data || error.message
    );
    throw error;
  }
};