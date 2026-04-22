import db from '../db';
export const InscripcionRepository = {
  add: (cursoId: number, estId: number) => 
    db.runAsync('INSERT INTO inscripciones (curso_id, estudiante_id) VALUES (?,?)', [cursoId, estId])
};