const db = require('../../DB/universidades/mysql');

const TABLA = 'universidades';

function universidades() {
  return db.universidades(TABLA);
}

function actualizar_universidad(body) {
  return db.actualizar_universidad(TABLA, body);
}

function eliminar_universidad(body) {
  return db.eliminar_universidad(TABLA, body);
}

function agregar_universidad(body) {
  return db.agregar_universidad(TABLA, body);
}

function universidad(body) {
  return db.universidad(TABLA, body);
}

module.exports = {
  universidad,
  universidades,
  agregar_universidad,
  actualizar_universidad,
  eliminar_universidad,
};
