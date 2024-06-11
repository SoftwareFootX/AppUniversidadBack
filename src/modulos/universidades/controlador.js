const db = require('../../DB/crud_comun');

const {universidades_todas} = require('../../DB/config.json');

function universidades() {
  return db.seleccionar_todo(universidades_todas);
}

function actualizar_universidad(body) {
  return db.actualizar_registro(
    tablas.universidades_todas,
    body,
    'iduniversidad',
    body.iduniversidad,
  );
}

function eliminar_universidad(id) {
  return db.eliminar_registro(universidades_todas, 'iduniversidad', id);
}

function agregar_universidad(body) {
  return db.agregar_registro(universidades_todas, body);
}

function universidad(id) {
  return db.seleccionar_con_id(universidades_todas, 'iduniversidad', id);
}

module.exports = {
  universidad,
  universidades,
  agregar_universidad,
  actualizar_universidad,
  eliminar_universidad,
};
