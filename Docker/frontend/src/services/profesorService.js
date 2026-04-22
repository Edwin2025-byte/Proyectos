import api from "./api";


// =====================================
// OBTENER TODOS LOS PROFESORES
// =====================================
export const getProfesores = async () => {
  try {
    const response = await api.get("profesores/");
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener profesores:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// OBTENER PROFESOR POR ID
// =====================================
export const getProfesorById = async (id) => {
  try {
    const response = await api.get(`profesores/${id}/`);
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener profesor:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// CREAR NUEVO PROFESOR
// =====================================
export const createProfesor = async (profesorData) => {
  try {
    const response = await api.post("profesores/", profesorData);
    return response.data;
  } catch (error) {
    console.log(
      "Error al crear profesor:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateProfesor = async (id, profesorData) => {
  try {
    const response = await api.put(`profesores/${id}/`, profesorData);
    return response.data;
  } catch (error) {
    console.log(
      "Error al actualizar profesor:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// ACTUALIZACIÓN PARCIAL (PATCH)
// =====================================
export const patchProfesor = async (id, profesorData) => {
  try {
    const response = await api.patch(`profesores/${id}/`, profesorData);
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
// ELIMINAR PROFESOR
// =====================================
export const deleteProfesor = async (id) => {
  try {
    await api.delete(`profesores/${id}/`);
    return true;
  } catch (error) {
    console.log(
      "Error al eliminar profesor:",
      error.response?.data || error.message
    );
    throw error;
  }
};
