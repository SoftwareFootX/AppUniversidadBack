const db = require('../../DB/alumnos/mysql');

const ALUMNOS = 'alumnos';

function alumnos() {
  return db.alumnos(ALUMNOS);
}

function actualizar_alumno(body) {
  return db.actualizar_alumno(ALUMNOS, body);
}

function eliminar_alumno(body) {
  return db.eliminar_alumno(ALUMNOS, body);
}

function login_alumno(body) {
  return db.login_alumno(ALUMNOS, body);
}

function registro_alumno(body) {
  return db.registro_alumno(ALUMNOS, body);
}

module.exports = {
  alumnos,
  login_alumno,
  registro_alumno,
  actualizar_alumno,
  eliminar_alumno,
};
