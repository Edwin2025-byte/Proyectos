// src/services/entregaService.js

import api from "./api";


// =====================================
// OBTENER TODAS LAS ENTREGAS
// =====================================
export const getEntregas = async () => {
  try {
    const response = await api.get("entregas/");
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener entregas:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// OBTENER ENTREGA POR ID
// =====================================
export const getEntregaById = async (id) => {
  try {
    const response = await api.get(`entregas/${id}/`);
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener entrega:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// CREAR NUEVA ENTREGA
// =====================================
export const createEntrega = async (entregaData) => {
  try {
    const response = await api.post("entregas/", entregaData);
    return response.data;
  } catch (error) {
    console.log(
      "Error al crear entrega:",
      error.response?.data || error.message
    );
    throw error;
  }
};


/*
Ejemplo de entregaData:

{
  tarea: 1,
  estudiante: 2,
  archivo_url: "https://misitio.com/archivos/tarea1.pdf",
  comentario_profesor: "",
  nota: null,
  xp_ganada: 0,
  estado_entrega: "Enviada",
  estado: true
}
*/


// =====================================
// ACTUALIZAR ENTREGA COMPLETA (PUT)
// =====================================
export const updateEntrega = async (id, entregaData) => {
  try {
    const response = await api.put(
      `entregas/${id}/`,
      entregaData
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error al actualizar entrega:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// ACTUALIZACIÓN PARCIAL (PATCH)
// =====================================
export const patchEntrega = async (id, entregaData) => {
  try {
    const response = await api.patch(
      `entregas/${id}/`,
      entregaData
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
// ELIMINAR ENTREGA
// =====================================
export const deleteEntrega = async (id) => {
  try {
    await api.delete(`entregas/${id}/`);
    return true;
  } catch (error) {
    console.log(
      "Error al eliminar entrega:",
      error.response?.data || error.message
    );
    throw error;
  }
};