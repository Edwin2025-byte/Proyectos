import db from '../db';
export const RolRepository = {
  getAll: () => db.getAllAsync('SELECT * FROM roles WHERE estado = 1')
};