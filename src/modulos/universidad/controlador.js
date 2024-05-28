const db = require('../../DB/universidad/mysql');

const USUARIOS = 'usuarios_universidad';

function administradores() {
  return db.administradores(USUARIOS);
}

function actualizar_admin(body) {
  return db.actualizar_admin(USUARIOS, body);
}

function eliminar_admin(body) {
  return db.eliminar_admin(USUARIOS, body);
}

function login_admin(body) {
  return db.login_admin(USUARIOS, body);
}

function registro_admin(body) {
  return db.registro_admin(USUARIOS, body);
}

module.exports = {
  administradores,
  login_admin,
  registro_admin,
  actualizar_admin,
  eliminar_admin,
};
