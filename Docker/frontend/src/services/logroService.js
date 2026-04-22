// src/services/logroService.js

import api from "./api";


// =====================================
// OBTENER TODOS LOS LOGROS
// =====================================
export const getLogros = async () => {
  try {
    const response = await api.get("logros/");
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener logros:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// OBTENER LOGRO POR ID
// =====================================
export const getLogroById = async (id) => {
  try {
    const response = await api.get(`logros/${id}/`);
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener logro:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// CREAR NUEVO LOGRO
// =====================================
export const createLogro = async (logroData) => {
  try {
    const response = await api.post("logros/", logroData);
    return response.data;
  } catch (error) {
    console.log(
      "Error al crear logro:",
      error.response?.data || error.message
    );
    throw error;
  }
};


/*
Ejemplo de logroData:

{
  titulo: "Primer Curso Completado",
  descripcion: "Completar exitosamente tu primer curso",
  icono_url: "https://misitio.com/iconos/logro1.png",
  color: "#FFD700",
  puntos_premio: 100,
  es_exclusivo_pro: false,
  estado: true
}
*/


// =====================================
// ACTUALIZAR LOGRO COMPLETO (PUT)
// =====================================
export const updateLogro = async (id, logroData) => {
  try {
    const response = await api.put(`logros/${id}/`, logroData);
    return response.data;
  } catch (error) {
    console.log(
      "Error al actualizar logro:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// ACTUALIZACIÓN PARCIAL (PATCH)
// =====================================
export const patchLogro = async (id, logroData) => {
  try {
    const response = await api.patch(`logros/${id}/`, logroData);
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
// ELIMINAR LOGRO
// =====================================
export const deleteLogro = async (id) => {
  try {
    await api.delete(`logros/${id}/`);
    return true;
  } catch (error) {
    console.log(
      "Error al eliminar logro:",
      error.response?.data || error.message
    );
    throw error;
  }
};