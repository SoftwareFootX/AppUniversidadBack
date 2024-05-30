const {queryDatabase} = require('../conexion');
const bcrypt = require('bcrypt');

function universidades(tabla) {
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

function universidad(tabla, id) {
  return new Promise((resolve, reject) => {
    queryDatabase(`SELECT * FROM ${tabla} WHERE iduniversidad = ?`, id)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        console.error('Error al seleccionar la universidad:', error);
        reject(error);
      });
  });
}

function actualizar_universidad(tabla, data) {
  return new Promise((resolve, reject) => {
    queryDatabase(
      `UPDATE ${tabla} SET ? WHERE iduniversidad = ?`,
      [data, data.iduniversidad],
      (error, result) => {
        return error ? reject(error) : resolve(result);
      },
    );
  });
}

function eliminar_universidad(tabla, id) {
  return new Promise((resolve, reject) => {
    queryDatabase(`DELETE FROM ${tabla} WHERE iduniversidad = ?`, id)
      .then(result => {
        console.log('Universidad eliminada correctamente');
        resolve(result);
      })
      .catch(error => {
        console.error('Error al eliminar la universidad:', error);
        reject(error);
      });
  });
}

function agregar_universidad(tabla, data) {
  return new Promise((resolve, reject) => {
    queryDatabase(`SELECT * FROM ${tabla} WHERE un_nombre = ?`, [
      data.un_nombre,
    ])
      .then(results => {
        if (results.length > 0) {
          const err = new Error('nombre_repetido');
          err.status = 400;
          throw err;
        } else {
          return queryDatabase(`INSERT INTO ${tabla} SET ?`, data);
        }
      })
      .then(results => {
        console.log('Universidad registrada exitosamente');
        resolve(results);
      })
      .catch(error => {
        console.error('Error en el registro:', error);
        reject(error);
      });
  });
}

module.exports = {
  universidad,
  universidades,
  actualizar_universidad,
  eliminar_universidad,
  agregar_universidad,
};
