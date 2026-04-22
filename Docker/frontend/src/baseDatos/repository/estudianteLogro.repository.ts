import db from '../db';
export const EstudianteLogroRepository = {
  assign: (estId: number, logroId: number) => 
    db.runAsync('INSERT INTO estudiante_logros (estudiante_id, logro_id) VALUES (?,?)', [estId, logroId])
};