import db from '../db';
export const EntregaRepository = {
  submit: (tareaId: number, estId: number, url: string) => 
    db.runAsync('INSERT INTO entregas (tarea_id, estudiante_id, archivo_url) VALUES (?,?,?)', [tareaId, estId, url])
};