import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('studify_pro.db');

export const initDatabase = async () => {
  try {
    await db.execAsync(`
      PRAGMA foreign_keys = ON;
      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS roles (
        rol_id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_rol TEXT NOT NULL UNIQUE,
        estado INTEGER DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS planes (
        plan_id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL UNIQUE,
        precio REAL DEFAULT 0.00,
        limite_cursos INTEGER DEFAULT 3,
        limite_estudiantes INTEGER DEFAULT 30,
        estado INTEGER DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS usuarios (
        usuario_id INTEGER PRIMARY KEY AUTOINCREMENT,
        rol_id INTEGER,
        plan_id INTEGER,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        nombre_completo TEXT NOT NULL,
        estado INTEGER DEFAULT 1,
        FOREIGN KEY(rol_id) REFERENCES roles(rol_id),
        FOREIGN KEY(plan_id) REFERENCES planes(plan_id)
      );

      CREATE TABLE IF NOT EXISTS profesores (
        profesor_id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER UNIQUE,
        especialidad TEXT,
        estado INTEGER DEFAULT 1,
        FOREIGN KEY(usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS estudiantes (
        estudiante_id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER UNIQUE,
        xp_actual INTEGER DEFAULT 0,
        puntos_oro INTEGER DEFAULT 0,
        nivel_actual INTEGER DEFAULT 1,
        estado INTEGER DEFAULT 1,
        FOREIGN KEY(usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS cursos (
        curso_id INTEGER PRIMARY KEY AUTOINCREMENT,
        profesor_id INTEGER,
        nombre_clase TEXT NOT NULL,
        codigo_acceso TEXT UNIQUE,
        es_premium INTEGER DEFAULT 0,
        estado INTEGER DEFAULT 1,
        FOREIGN KEY(profesor_id) REFERENCES profesores(profesor_id)
      );

      CREATE TABLE IF NOT EXISTS inscripciones (
        inscripcion_id INTEGER PRIMARY KEY AUTOINCREMENT,
        curso_id INTEGER,
        estudiante_id INTEGER,
        estado INTEGER DEFAULT 1,
        FOREIGN KEY(curso_id) REFERENCES cursos(curso_id) ON DELETE CASCADE,
        FOREIGN KEY(estudiante_id) REFERENCES estudiantes(estudiante_id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS temas (
        tema_id INTEGER PRIMARY KEY AUTOINCREMENT,
        curso_id INTEGER,
        nombre_tema TEXT NOT NULL,
        estado INTEGER DEFAULT 1,
        FOREIGN KEY(curso_id) REFERENCES cursos(curso_id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS tareas (
        tarea_id INTEGER PRIMARY KEY AUTOINCREMENT,
        tema_id INTEGER,
        titulo TEXT NOT NULL,
        xp_recompensa INTEGER DEFAULT 100,
        fecha_limite TEXT,
        estado INTEGER DEFAULT 1,
        FOREIGN KEY(tema_id) REFERENCES temas(tema_id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS entregas (
        entrega_id INTEGER PRIMARY KEY AUTOINCREMENT,
        tarea_id INTEGER,
        estudiante_id INTEGER,
        archivo_url TEXT,
        nota REAL,
        xp_ganada INTEGER DEFAULT 0,
        estado_entrega TEXT DEFAULT 'Pendiente',
        estado INTEGER DEFAULT 1,
        FOREIGN KEY(tarea_id) REFERENCES tareas(tarea_id) ON DELETE CASCADE,
        FOREIGN KEY(estudiante_id) REFERENCES estudiantes(estudiante_id)
      );

      CREATE TABLE IF NOT EXISTS logros (
        logro_id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        descripcion TEXT,
        puntos_premio INTEGER DEFAULT 50,
        es_exclusivo_pro INTEGER DEFAULT 0,
        estado INTEGER DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS estudiante_logros (
        estudiante_id INTEGER,
        logro_id INTEGER,
        estado INTEGER DEFAULT 1,
        PRIMARY KEY (estudiante_id, logro_id),
        FOREIGN KEY(estudiante_id) REFERENCES estudiantes(estudiante_id),
        FOREIGN KEY(logro_id) REFERENCES logros(logro_id)
      );

      CREATE TABLE IF NOT EXISTS pagos (
        pago_id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER,
        monto REAL NOT NULL,
        metodo_pago TEXT,
        id_transaccion_externa TEXT,
        estado_pago TEXT DEFAULT 'Completado',
        estado INTEGER DEFAULT 1,
        FOREIGN KEY(usuario_id) REFERENCES usuarios(usuario_id)
      );

      INSERT OR IGNORE INTO roles (rol_id, nombre_rol) VALUES (1, 'Profesor'), (2, 'Estudiante'), (3, 'Admin');
      INSERT OR IGNORE INTO planes (plan_id, nombre, precio) VALUES (1, 'Gratuito', 0.0), (2, 'Pro', 9.99);
    `);
  } catch (error) {
    console.error("Error initDatabase:", error);
  }
};

export default db;