import db from '../db';
export const CursoRepository = {
  create: (profId: number, nombre: string, codigo: string, premium: number) => 
    db.runAsync('INSERT INTO cursos (profesor_id, nombre_clase, codigo_acceso, es_premium) VALUES (?,?,?,?)', [profId, nombre, codigo, premium])
};