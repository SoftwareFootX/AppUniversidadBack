const {queryDatabase} = require('./conexion');

function agregar_registro(tabla, data) {
  return new Promise((resolve, reject) => {
    queryDatabase(`INSERT INTO ${tabla} SET ?`, data)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function actualizar_registro(tabla, data, campo_id, id) {
  return new Promise((resolve, reject) => {
    queryDatabase(`UPDATE ${tabla} SET ? WHERE ${campo_id} = ?`, [data, id])
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function actualizar_agregar_registro(tabla, data, campo_id, id) {
  return new Promise((resolve, reject) => {
    seleccionar_con_id(tabla, campo_id, id)
      .then(results => {
        if (results.length === 0) {
          agregar_registro(tabla, data).then(results => {
            resolve(results);
          });
        } else {
          actualizar_registro(tabla, data, campo_id, id).then(results => {
            resolve(results);
          });
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function seleccionar_todo(
  tabla,
  campo_order_by = undefined,
  order_by_asc = true,
) {
  const order_by = order_by_asc ? 'ASC' : 'DESC';

  const query_orderby = campo_order_by
    ? `ORDER BY ${campo_order_by} ${order_by}`
    : '';

  return new Promise((resolve, reject) => {
    queryDatabase(`SELECT * FROM ${tabla} ${query_orderby}`)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function seleccionar_con_id(tabla, campo_id, id) {
  return new Promise((resolve, reject) => {
    queryDatabase(`SELECT * FROM ${tabla} WHERE ${campo_id} = ?`, id)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function eliminar_registro(tabla, campo_id, id) {
  return new Promise((resolve, reject) => {
    queryDatabase(`DELETE FROM ${tabla} WHERE ${campo_id} = ?`, id)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

module.exports = {
  agregar_registro,
  actualizar_registro,
  actualizar_agregar_registro,
  seleccionar_todo,
  seleccionar_con_id,
  eliminar_registro,
};
