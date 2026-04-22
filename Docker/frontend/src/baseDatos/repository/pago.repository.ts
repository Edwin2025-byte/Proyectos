import db from '../db';
export const PagoRepository = {
  register: (uId: number, monto: number, metodo: string, transId: string) => 
    db.runAsync('INSERT INTO pagos (usuario_id, monto, metodo_pago, id_transaccion_externa) VALUES (?,?,?,?)', [uId, monto, metodo, transId])
};