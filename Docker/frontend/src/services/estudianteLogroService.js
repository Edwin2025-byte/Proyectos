// src/services/estudianteLogroService.js

import api from "./api";


// =====================================
// OBTENER TODOS LOS ESTUDIANTE-LOGROS
// =====================================
export const getEstudianteLogros = async () => {
  try {
    const response = await api.get("estudiante-logros/");
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener estudiante-logros:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// OBTENER ESTUDIANTE-LOGRO POR ID
// =====================================
export const getEstudianteLogroById = async (id) => {
  try {
    const response = await api.get(`estudiante-logros/${id}/`);
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener estudiante-logro:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// CREAR NUEVO ESTUDIANTE-LOGRO
// =====================================
export const createEstudianteLogro = async (data) => {
  try {
    const response = await api.post("estudiante-logros/", data);
    return response.data;
  } catch (error) {
    console.log(
      "Error al crear estudiante-logro:",
      error.response?.data || error.message
    );
    throw error;
  }
};


/*
Ejemplo de data:

{
  estudiante: 1,
  logro: 2,
  estado: true
}
*/


// =====================================
// ACTUALIZAR COMPLETO (PUT)
// =====================================
export const updateEstudianteLogro = async (id, data) => {
  try {
    const response = await api.put(
      `estudiante-logros/${id}/`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error al actualizar estudiante-logro:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// ACTUALIZACIÓN PARCIAL (PATCH)
// =====================================
export const patchEstudianteLogro = async (id, data) => {
  try {
    const response = await api.patch(
      `estudiante-logros/${id}/`,
      data
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
// ELIMINAR ESTUDIANTE-LOGRO
// =====================================
export const deleteEstudianteLogro = async (id) => {
  try {
    await api.delete(`estudiante-logros/${id}/`);
    return true;
  } catch (error) {
    console.log(
      "Error al eliminar estudiante-logro:",
      error.response?.data || error.message
    );
    throw error;
  }
};