import db from '../db';
export const PlanRepository = {
  getAll: () => db.getAllAsync('SELECT * FROM planes WHERE estado = 1')
};