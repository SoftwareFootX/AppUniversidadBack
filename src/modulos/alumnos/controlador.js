const db = require('../../DB/alumnos/mysql');

const ALUMNOS = 'alumnos';
const FICHA = 'fichas_clinicas_alumnos';

/***** CONTROLADOR FICHA ALUMNOS *****/

function fichas() {
  return db.fichas(FICHA);
}

function ficha_por_id(id) {
  return db.ficha_por_id(FICHA, id);
}

function agregar_ficha(body) {
  return db.agregar_ficha(FICHA, body);
}

function actualizar_ficha(body) {
  return db.actualizar_ficha(FICHA, body);
}

/***** CONTROLADOR ALUMNOS *****/

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

function agregar_alumno(body) {
  return db.agregar_alumno(ALUMNOS, body);
}

module.exports = {
  /***** CONTROLADOR FICHA ALUMNOS *****/

  fichas,
  ficha_por_id,
  agregar_ficha,
  actualizar_ficha,

  /***** CONTROLADOR ALUMNOS *****/

  alumnos,
  login_alumno,
  actualizar_alumno,
  agregar_alumno,
  eliminar_alumno,
};
