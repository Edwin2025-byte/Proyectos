import db from '../db';
export const ProfesorRepository = {
  create: (userId: number, especialidad: string) => 
    db.runAsync('INSERT INTO profesores (usuario_id, especialidad) VALUES (?,?)', [userId, especialidad])
};