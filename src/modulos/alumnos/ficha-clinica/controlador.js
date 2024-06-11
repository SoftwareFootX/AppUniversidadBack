const db = require('../../../DB/crud_comun');
const {tablas_alumnos} = require('../../../DB/config.json');

const {tfichas_clinicas, fk_alumno} = tablas_alumnos;

function ficha_clinica_alumno(body) {
  return db.seleccionar_todo(
    tfichas_clinicas,
    body.campo_order_by,
    body.order_by_asc,
  );
}

function ficha_clinica_por_id(id) {
  return db.seleccionar_con_id(tfichas_clinicas, fk_alumno, id);
}

function actualizar_ficha_clinica(body) {
  return db.actualizar_agregar_registro(
    tfichas_clinicas,
    body,
    fk,
    body.fk_alumno,
  );
}

function eliminar_ficha_clinica(id) {
  return db.eliminar_registro(tfichas_clinicas, fk_alumno, id);
}

module.exports = {
  ficha_clinica_alumno,
  ficha_clinica_por_id,
  actualizar_ficha_clinica,
  eliminar_ficha_clinica,
};
