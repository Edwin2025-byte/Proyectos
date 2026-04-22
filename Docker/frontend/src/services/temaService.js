import api from "./api";


// =====================================
// OBTENER TODOS LOS TEMAS
// =====================================
export const getTemas = async () => {
  try {
    const response = await api.get("temas/");
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener temas:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// OBTENER TEMA POR ID
// =====================================
export const getTemaById = async (id) => {
  try {
    const response = await api.get(`temas/${id}/`);
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener tema:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// CREAR NUEVO TEMA
// =====================================
export const createTema = async (temaData) => {
  try {
    const response = await api.post("temas/", temaData);
    return response.data;
  } catch (error) {
    console.log(
      "Error al crear tema:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// =====================================
// ACTUALIZAR TEMA COMPLETO (PUT)
// =====================================
export const updateTema = async (id, temaData) => {
  try {
    const response = await api.put(`temas/${id}/`, temaData);
    return response.data;
  } catch (error) {
    console.log(
      "Error al actualizar tema:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// ELIMINAR TEMA
// =====================================
export const deleteTema = async (id) => {
  try {
    await api.delete(`temas/${id}/`);
    return true;
  } catch (error) {
    console.log(
      "Error al eliminar tema:",
      error.response?.data || error.message
    );
    throw error;
  }
};