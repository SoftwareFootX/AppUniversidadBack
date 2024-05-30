const db = require('../../DB/usuarios-universidad/mysql');

const TABLA = 'usuarios_universidad';

function usuarios_uni() {
  return db.usuarios_uni(TABLA);
}

function actualizar_usuario_uni(body) {
  return db.actualizar_usuario_uni(TABLA, body);
}

function eliminar_usuario_uni(body) {
  return db.eliminar_usuario_uni(TABLA, body);
}

function login_usuario_uni(body) {
  return db.login_usuario_uni(TABLA, body);
}

function agregar_usuario_uni(body) {
  return db.agregar_usuario_uni(TABLA, body);
}

module.exports = {
  usuarios_uni,
  login_usuario_uni,
  agregar_usuario_uni,
  actualizar_usuario_uni,
  eliminar_usuario_uni,
};
