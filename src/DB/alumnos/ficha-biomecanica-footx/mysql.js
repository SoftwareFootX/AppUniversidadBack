const {queryDatabase} = require('../../conexion');

function fichas_biomecanica_footx(tabla) {
  return new Promise((resolve, reject) => {
    queryDatabase(`SELECT * FROM ${tabla}`)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function ficha_biomecanica_footx_por_id(tabla, id) {
  return new Promise((resolve, reject) => {
    queryDatabase(`SELECT * FROM ${tabla} WHERE fk_alumno = ?`, [id])
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function agregar_ficha_biomecanica_footx(tabla, data) {
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

function actualizar_ficha_biomecanica_footx(tabla, data) {
  return new Promise((resolve, reject) => {
    queryDatabase(`SELECT * FROM ${tabla} WHERE fk_alumno = ?`, [
      data.fk_alumno,
    ])
      .then(results => {
        if (results.length === 0) {
          agregar_ficha(tabla, data);
          resolve(results);
        } else {
          queryDatabase(`UPDATE ${tabla} SET ? WHERE fk_alumno = ?`, [
            data,
            data.fk_alumno,
          ]).then(result => {
            resolve(result);
          });
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function eliminar_ficha_biomecanica_footx(tabla, id) {
  return new Promise((resolve, reject) => {
    queryDatabase(`DELETE FROM ${tabla} WHERE fk_alumno = ?`, id)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

module.exports = {
  fichas_biomecanica_footx,
  ficha_biomecanica_footx_por_id,
  agregar_ficha_biomecanica_footx,
  actualizar_ficha_biomecanica_footx,
  eliminar_ficha_biomecanica_footx,
};
