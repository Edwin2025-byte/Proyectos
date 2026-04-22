// src/services/planService.js

import api from "./api";


// =====================================
// OBTENER TODOS LOS PLANES
// =====================================
export const getPlanes = async () => {
  try {
    const response = await api.get("planes/");
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener planes:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// OBTENER PLAN POR ID
// =====================================
export const getPlanById = async (id) => {
  try {
    const response = await api.get(`planes/${id}/`);
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener plan:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// CREAR NUEVO PLAN
// =====================================
export const createPlan = async (planData) => {
  try {
    const response = await api.post("planes/", planData);
    return response.data;
  } catch (error) {
    console.log(
      "Error al crear plan:",
      error.response?.data || error.message
    );
    throw error;
  }
};


/*
Ejemplo de planData:

{
  nombre_plan: "Premium",
  descripcion: "Acceso completo a todos los cursos",
  precio: 99.99,
  limite_cursos: 50,
  limite_estudiantes: 500,
  estado: true
}
*/


// =====================================
// ACTUALIZAR PLAN COMPLETO (PUT)
// =====================================
export const updatePlan = async (id, planData) => {
  try {
    const response = await api.put(`planes/${id}/`, planData);
    return response.data;
  } catch (error) {
    console.log(
      "Error al actualizar plan:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// ACTUALIZACIÓN PARCIAL (PATCH)
// =====================================
export const patchPlan = async (id, planData) => {
  try {
    const response = await api.patch(`planes/${id}/`, planData);
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
// ELIMINAR PLAN
// =====================================
export const deletePlan = async (id) => {
  try {
    await api.delete(`planes/${id}/`);
    return true;
  } catch (error) {
    console.log(
      "Error al eliminar plan:",
      error.response?.data || error.message
    );
    throw error;
  }
};
