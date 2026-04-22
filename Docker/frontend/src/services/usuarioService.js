import api from "./api";


// =====================================
// OBTENER TODOS LOS USUARIOS
// =====================================
export const getUsuarios = async () => {
  try {
    const response = await api.get("usuarios/");
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener usuarios:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// OBTENER USUARIO POR ID
// =====================================
export const getUsuarioById = async (id) => {
  try {
    const response = await api.get(`usuarios/${id}/`);
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener usuario:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// CREAR NUEVO USUARIO
// =====================================
export const createUsuario = async (usuarioData) => {
  try {
    const response = await api.post("usuarios/", usuarioData);
    return response.data;
  } catch (error) {
    console.log(
      "Error al crear usuario:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateUsuario = async (id, usuarioData) => {
  try {
    const response = await api.put(`usuarios/${id}/`, usuarioData);
    return response.data;
  } catch (error) {
    console.log(
      "Error al actualizar usuario:",
      error.response?.data || error.message
    );
    throw error;
  }
};


export const deleteUsuario = async (id) => {
  try {
    await api.delete(`usuarios/${id}/`);
    return true;
  } catch (error) {
    console.log(
      "Error al eliminar usuario:",
      error.response?.data || error.message
    );
    throw error;
  }
};