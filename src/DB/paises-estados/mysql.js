const {queryDatabase} = require('../conexion');

function paises_todos(tabla) {
  return new Promise((resolve, reject) => {
    queryDatabase(`SELECT * FROM ${tabla} order by pais_nombre asc`)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function estados_por_pais(tabla, fk_pais) {
  return new Promise((resolve, reject) => {
    queryDatabase(`SELECT * FROM ${tabla} WHERE fk_pais = ${fk_pais}`)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

module.exports = {
  paises_todos,
  estados_por_pais,
};
