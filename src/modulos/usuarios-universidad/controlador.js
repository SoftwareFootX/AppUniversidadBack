const db = require('../../DB/usuarios-universidad/mysql');

const {usuarios_universidad} = require('../../DB/config.json');

function usuarios_uni() {
  return db.usuarios_uni(usuarios_universidad);
}

function usuario_por_id(id) {
  return db.usuario_por_id(usuarios_universidad, id);
}

function actualizar_usuario_uni(body) {
  return db.actualizar_usuario_uni(usuarios_universidad, body);
}

function eliminar_usuario_uni(body) {
  return db.eliminar_usuario_uni(usuarios_universidad, body);
}

function login_usuario_uni(body) {
  return db.login_usuario_uni(usuarios_universidad, body);
}

function agregar_usuario_uni(body) {
  return db.agregar_usuario_uni(usuarios_universidad, body);
}

module.exports = {
  usuarios_uni,
  usuario_por_id,
  login_usuario_uni,
  agregar_usuario_uni,
  actualizar_usuario_uni,
  eliminar_usuario_uni,
};
