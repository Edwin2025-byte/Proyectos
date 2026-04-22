import api from "./api";


// =====================================
// OBTENER TODAS LAS TAREAS
// =====================================
export const getTareas = async () => {
  try {
    const response = await api.get("tareas/");
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener tareas:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// OBTENER TAREA POR ID
// =====================================
export const getTareaById = async (id) => {
  try {
    const response = await api.get(`tareas/${id}/`);
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener tarea:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// CREAR NUEVA TAREA
// =====================================
export const createTarea = async (tareaData) => {
  try {
    const response = await api.post("tareas/", tareaData);
    return response.data;
  } catch (error) {
    console.log(
      "Error al crear tarea:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// =====================================
// ACTUALIZAR TAREA COMPLETA (PUT)
// =====================================
export const updateTarea = async (id, tareaData) => {
  try {
    const response = await api.put(`tareas/${id}/`, tareaData);
    return response.data;
  } catch (error) {
    console.log(
      "Error al actualizar tarea:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// ACTUALIZACIÓN PARCIAL (PATCH)
// =====================================
export const patchTarea = async (id, tareaData) => {
  try {
    const response = await api.patch(`tareas/${id}/`, tareaData);
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
// ELIMINAR TAREA
// =====================================
export const deleteTarea = async (id) => {
  try {
    await api.delete(`tareas/${id}/`);
    return true;
  } catch (error) {
    console.log(
      "Error al eliminar tarea:",
      error.response?.data || error.message
    );
    throw error;
  }
};