const db = require('../DB/mysql');

// Controladores:

const VISTA_todos_los_alumnos = 'alumnos_completo';
const TABLA_ALUMNOS = 'alumnos';

// Mostrar todos los datos de una tabla:

function todos_los_alumnos() {
  return db.todos_los_alumnos(VISTA_todos_los_alumnos);
}

// Registrar/actualizar datos de una tabla:

function registrar_actualizar_alumno(body) {
  return db.registrar_actualizar_alumno(TABLA_ALUMNOS, body);
}

// Eliminar datos de una tabla por id:

function eliminar_alumno(body) {
  return db.eliminar_alumno(TABLA_ALUMNOS, body);
}

module.exports = {
  eliminar_alumno,
  registrar_actualizar_alumno,
  todos_los_alumnos,
};
