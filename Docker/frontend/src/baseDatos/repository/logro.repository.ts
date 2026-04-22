import db from '../db';
export const LogroRepository = {
  getAll: () => db.getAllAsync('SELECT * FROM logros WHERE estado = 1')
};