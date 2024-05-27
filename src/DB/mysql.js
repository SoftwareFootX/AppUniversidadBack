const {conexion} = require('./conexion');

// Mostrar todos los datos de una tabla

function todos_los_alumnos(tabla) {
    return new Promise((resolve, reject) => {
      conexion.query(
        `SELECT * FROM ${tabla} order by apellido asc`,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
    });
  }

  // Función condicional para agregar o actualizar datos en una tabla:

function registrar_actualizar_alumno(tabla, data) {
    if (data && data.idalumnos == 0) {
      return insertar(tabla, data);
    } else {
      return actualizar(tabla, data);
    }
  }
  
  function insertar(tabla, data) {
    return new Promise((resolve, reject) => {
      conexion.query(`INSERT INTO ${tabla} SET ?`, data, (error, result) => {
        return error ? reject(error) : resolve(result);
      });
    });
  }
  
  function actualizar(tabla, data) {
    return new Promise((resolve, reject) => {
      conexion.query(
        `UPDATE ${tabla} SET ? WHERE idalumnos = ?`,
        [data, data.idalumnos],
        (error, result) => {
          return error ? reject(error) : resolve(result);
        },
      );
    });
  }

  // Función para eliminar por ID elementos en una tabla:

  function eliminar_alumno(tabla, id) {
    return new Promise((resolve, reject) => {
      conexion.query(
        `DELETE FROM ${tabla} WHERE idalumnos = ?`,
        id,
        (error, result) => {
          return error ? reject(error) : resolve(result);
        },
      );
    });
  }

module.exports = {
    registrar_actualizar_alumno,
    todos_los_alumnos,
    eliminar_alumno
};
