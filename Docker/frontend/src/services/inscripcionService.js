// src/services/inscripcionService.js

import api from "./api";


// =====================================
// OBTENER TODAS LAS INSCRIPCIONES
// =====================================
export const getInscripciones = async () => {
  try {
    const response = await api.get("inscripciones/");
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener inscripciones:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// OBTENER INSCRIPCIÓN POR ID
// =====================================
export const getInscripcionById = async (id) => {
  try {
    const response = await api.get(`inscripciones/${id}/`);
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener inscripción:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// CREAR NUEVA INSCRIPCIÓN
// =====================================
export const createInscripcion = async (inscripcionData) => {
  try {
    const response = await api.post("inscripciones/", inscripcionData);
    return response.data;
  } catch (error) {
    console.log(
      "Error al crear inscripción:",
      error.response?.data || error.message
    );
    throw error;
  }
};


/*
Ejemplo de inscripcionData:

{
  curso: 1,
  estudiante: 2,
  estado: true
}
*/


// =====================================
// ACTUALIZAR INSCRIPCIÓN COMPLETA (PUT)
// =====================================
export const updateInscripcion = async (id, inscripcionData) => {
  try {
    const response = await api.put(
      `inscripciones/${id}/`,
      inscripcionData
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error al actualizar inscripción:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// ACTUALIZACIÓN PARCIAL (PATCH)
// =====================================
export const patchInscripcion = async (id, inscripcionData) => {
  try {
    const response = await api.patch(
      `inscripciones/${id}/`,
      inscripcionData
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
// ELIMINAR INSCRIPCIÓN
// =====================================
export const deleteInscripcion = async (id) => {
  try {
    await api.delete(`inscripciones/${id}/`);
    return true;
  } catch (error) {
    console.log(
      "Error al eliminar inscripción:",
      error.response?.data || error.message
    );
    throw error;
  }
};