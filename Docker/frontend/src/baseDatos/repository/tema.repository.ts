import db from '../db';
export const TemaRepository = {
  create: (cursoId: number, nombre: string) => 
    db.runAsync('INSERT INTO temas (curso_id, nombre_tema) VALUES (?,?)', [cursoId, nombre])
};