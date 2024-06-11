const db = require('../../DB/alumnos/mysql');
const {tablas_alumnos} = require('../../DB/config.json');

const db2 = require('../../DB/crud_comun');

const {talumnos, idalumnos} = tablas_alumnos;

function alumnos() {
  return db2.seleccionar_todo(talumnos);
}

function alumno_por_id(id) {
  return db.alumno_por_id(talumnos, id);
}

function actualizar_alumno(body) {
  return db2.actualizar_registro(talumnos, body, idalumnos, body.idalumnos);
}

function eliminar_alumno(body) {
  return db.eliminar_alumno(talumnos, body);
}

function login_alumno(body) {
  return db.login_alumno(talumnos, body);
}

function agregar_alumno(body) {
  return db.agregar_alumno(talumnos, body);
}

module.exports = {
  alumnos,
  alumno_por_id,
  login_alumno,
  actualizar_alumno,
  agregar_alumno,
  eliminar_alumno,
};
