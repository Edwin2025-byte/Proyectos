import db from '../db';
export const EstudianteRepository = {
  create: (userId: number) => db.runAsync('INSERT INTO estudiantes (usuario_id) VALUES (?)', [userId]),
  updateXP: (id: number, xp: number) => 
    db.runAsync('UPDATE estudiantes SET xp_actual = xp_actual + ? WHERE estudiante_id = ?', [xp, id])
};