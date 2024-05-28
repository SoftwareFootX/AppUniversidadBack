// const {executeQuery} = require('../conexion');

/*

  async function todos_los_alumnos(tabla) {
    try {
      const result = await executeQuery(
        `SELECT * FROM ${tabla} order by apellido asc`
      );
      return result;
    } catch (error) {
      throw error;
    }
  }


  async function insertar(tabla, data) {
    try {
      const result = await executeQuery(
        `INSERT INTO ${tabla} SET ?`,
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  async function actualizar(tabla, data) {
    try {
      const result = await executeQuery(
        `UPDATE ${tabla} SET ? WHERE idalumnos = ?`,
        [data, data.idalumnos]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  async function eliminar_alumno(tabla, id) {
    try {
      const result = await executeQuery(
        `DELETE FROM ${tabla} WHERE idalumnos = ?`,
        [id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  */

// module.exports = {
//   registrar_actualizar_alumno,
//   todos_los_alumnos,
//   eliminar_alumno,
// };

// conexion

// const mysql = require('mysql');
// const config = require('../config');

// const pool = mysql.createPool({
//   connectionLimit: 10, // Número máximo de conexiones en el pool
//   host: config.mysql.host,
//   user: config.mysql.user,
//   password: config.mysql.password,
//   database: config.mysql.database,
// });

//  async function executeQuery (query, params = []) {
//   return new Promise((resolve, reject) => {
//     pool.getConnection((err, connection) => {
//       if (err) {
//         console.error('[db err]', err);
//         return reject(err);
//       }

//       console.log('Solicitud de conexión a la base de datos.');

//       connection.query(query, params, (err, results) => {
//         if (err) {
//           console.error('[db err]', err);
//           connection.release(); // Liberar la conexión en caso de error
//           return reject(err);
//         }

//         connection.release(); // Liberar la conexión después de su uso
//         resolve(results);
//       });
//       console.log('Consulta ejecutada. Cerrando conexión.');
//     });
//   });
// }

// module.exports = {
//    executeQuery
// };
