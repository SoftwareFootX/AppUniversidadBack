const {conexion} = require('../conexion');

function paises_todos(tabla) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT * FROM ${tabla} order by pais_nombre asc`,
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );
  });
}

function estados_por_pais(tabla, fk_pais) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT * FROM ${tabla} WHERE fk_pais = ${fk_pais}`,
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );
  });
}

module.exports = {
  paises_todos,
  estados_por_pais,
};
