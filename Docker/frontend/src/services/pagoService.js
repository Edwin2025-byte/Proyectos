// src/services/pagoService.js

import api from "./api";


// =====================================
// OBTENER TODOS LOS PAGOS
// =====================================
export const getPagos = async () => {
  try {
    const response = await api.get("pagos/");
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener pagos:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// OBTENER PAGO POR ID
// =====================================
export const getPagoById = async (id) => {
  try {
    const response = await api.get(`pagos/${id}/`);
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener pago:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// CREAR NUEVO PAGO
// =====================================
export const createPago = async (pagoData) => {
  try {
    const response = await api.post("pagos/", pagoData);
    return response.data;
  } catch (error) {
    console.log(
      "Error al crear pago:",
      error.response?.data || error.message
    );
    throw error;
  }
};


/*
Ejemplo de pagoData:

{
  usuario: 1,
  monto: 150.00,
  metodo_pago: "Tarjeta",
  id_transaccion_externa: "TXN-2026-001",
  detalle_pago: {
    banco: "Banco Unión",
    referencia: "ABC123"
  },
  estado_pago: "Completado",
  fecha_pago: "2026-04-22T10:30:00",
  estado: true
}
*/


// =====================================
// ACTUALIZAR PAGO COMPLETO (PUT)
// =====================================
export const updatePago = async (id, pagoData) => {
  try {
    const response = await api.put(`pagos/${id}/`, pagoData);
    return response.data;
  } catch (error) {
    console.log(
      "Error al actualizar pago:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// =====================================
// ACTUALIZACIÓN PARCIAL (PATCH)
// =====================================
export const patchPago = async (id, pagoData) => {
  try {
    const response = await api.patch(`pagos/${id}/`, pagoData);
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
// ELIMINAR PAGO
// =====================================
export const deletePago = async (id) => {
  try {
    await api.delete(`pagos/${id}/`);
    return true;
  } catch (error) {
    console.log(
      "Error al eliminar pago:",
      error.response?.data || error.message
    );
    throw error;
  }
};
