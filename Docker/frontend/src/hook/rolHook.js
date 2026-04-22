// src/services/rolLocalService.js

import db from "../baseDatos/db";


// =====================================
// OBTENER TODOS LOS ROLES
// =====================================
export const getRoles = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        SELECT * 
        FROM roles
        ORDER BY rol_id DESC
        `,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};


// =====================================
// OBTENER ROL POR ID
// =====================================
export const getRolById = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        SELECT * 
        FROM roles
        WHERE rol_id = ?
        `,
        [id],
        (_, result) => resolve(result.rows._array[0]),
        (_, error) => reject(error)
      );
    });
  });
};


// =====================================
// CREAR NUEVO ROL
// =====================================
export const createRol = (nombre_rol, estado = 1) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        INSERT INTO roles
        (
          nombre_rol,
          estado,
          fecha_creacion,
          fecha_modificacion
        )
        VALUES
        (
          ?,
          ?,
          datetime('now'),
          datetime('now')
        )
        `,
        [nombre_rol, estado],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};


// =====================================
// ACTUALIZAR ROL
// =====================================
export const updateRol = (id, nombre_rol, estado = 1) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        UPDATE roles
        SET
          nombre_rol = ?,
          estado = ?,
          fecha_modificacion = datetime('now')
        WHERE rol_id = ?
        `,
        [nombre_rol, estado, id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};


// =====================================
// ELIMINAR ROL
// =====================================
export const deleteRol = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        DELETE FROM roles
        WHERE rol_id = ?
        `,
        [id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};