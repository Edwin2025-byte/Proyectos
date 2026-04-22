import db from '../db';
export const UsuarioRepository = {
  findByEmail: (email: string) => db.getFirstAsync('SELECT * FROM usuarios WHERE email = ?', [email]),
  create: (rolId: number, planId: number, email: string, passHash: string, nombre: string) => 
    db.runAsync('INSERT INTO usuarios (rol_id, plan_id, email, password_hash, nombre_completo) VALUES (?,?,?,?,?)', [rolId, planId, email, passHash, nombre])
};