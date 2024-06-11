const db = require('../../../DB/alumnos/ficha-biomecanica-footx/mysql');
const db2 = require('../../../DB/crud_comun');
const {tablas_alumnos} = require('../../../DB/config.json');

const {tfichas_biomecanicas} = tablas_alumnos;

function fichas_biomecanica_footx() {
  return db.fichas_biomecanica_footx(tfichas_biomecanicas);
}

function ficha_biomecanica_footx_por_id(id) {
  return db.ficha_biomecanica_footx_por_id(tfichas_biomecanicas, id);
}

function agregar_ficha_biomecanica_footx(body) {
  return db.agregar_ficha_biomecanica_footx(tfichas_biomecanicas, body);
}

function eliminar_ficha_biomecanica_footx(body) {
  return db.eliminar_ficha_biomecanica_footx(tfichas_biomecanicas, body);
}

function actualizar_ficha_biomecanica_footx(body) {
  return db.actualizar_ficha_biomecanica_footx(tfichas_biomecanicas, body);
}

module.exports = {
  fichas_biomecanica_footx,
  ficha_biomecanica_footx_por_id,
  agregar_ficha_biomecanica_footx,
  eliminar_ficha_biomecanica_footx,
  actualizar_ficha_biomecanica_footx,
};
