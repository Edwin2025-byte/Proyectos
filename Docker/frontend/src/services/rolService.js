import api from "./api";

export const getRoles = async () => {
  try {
    const response = await api.get("roles/");
    return response.data;
  } catch (error) {
    console.log("Error al obtener roles:", error.response?.data || error.message);
    throw error;
  }
};

export const getRolById = async (id) => {
  try {
    const response = await api.get(`roles/${id}/`);
    return response.data;
  } catch (error) {
    console.log("Error al obtener rol:", error.response?.data || error.message);
    throw error;
  }
};

export const createRol = async (rolData) => {
  try {
    const response = await api.post("roles/", rolData);
    return response.data;
  } catch (error) {
    console.log("Error al crear rol:", error.response?.data || error.message);
    throw error;
  }
};


export const updateRol = async (id, rolData) => {
  try {
    const response = await api.put(`roles/${id}/`, rolData);
    return response.data;
  } catch (error) {
    console.log("Error al actualizar rol:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteRol = async (id) => {
  try {
    await api.delete(`roles/${id}/`);
    return true;
  } catch (error) {
    console.log("Error al eliminar rol:", error.response?.data || error.message);
    throw error;
  }
};