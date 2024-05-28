const mysql = require('mysql');
const config = require('../config');

// Configuración de conexión a base de datos MySQL:

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let conexion;

function conMysql() {
  conexion = mysql.createConnection(dbconfig);
  conexion.connect(err => {
    if (err) {
      console.log('[db err]', err);
      setTimeout(conMysql, 200);
    } else {
      console.log('DB conectada');
    }
    return conexion
  });

  conexion.on('error', err => {
    console.log('[db err]', err);
    if (err.code === 'PROTOCOL_CONEXION_LOST') {
      conMysql();
    } else {
      throw err;
    }
  });
}

conMysql();


const pool = mysql.createPool({
  connectionLimit: 10, // Número máximo de conexiones en el pool
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
});

 async function executeQuery (query, params = []) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('[db err]', err);
        return reject(err);
      }

      console.log('Solicitud de conexión a la base de datos.');

      connection.query(query, params, (err, results) => {
        if (err) {
          console.error('[db err]', err);
          connection.release(); // Liberar la conexión en caso de error
          return reject(err);
        }

        connection.release(); // Liberar la conexión después de su uso
        resolve(results);
      });
      console.log('Consulta ejecutada. Cerrando conexión.');
    });
  });
}

module.exports = {
   executeQuery, conexion
};







