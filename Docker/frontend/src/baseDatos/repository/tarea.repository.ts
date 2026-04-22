import db from '../db';
export const TareaRepository = {
  create: (temaId: number, titulo: string, xp: number, fecha: string) => 
    db.runAsync('INSERT INTO tareas (tema_id, titulo, xp_recompensa, fecha_limite) VALUES (?,?,?,?)', [temaId, titulo, xp, fecha])
};