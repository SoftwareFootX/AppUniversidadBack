const mysql = require('mysql');
const config = require('../config');

// Configuración de conexión a base de datos MySQL:

const pool = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  waitForConnections: true,
  connectionLimit: 30,
  queueLimit: 0,
});

const queryDatabase = (query, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      // console.log('Apertura de solicitud');

      if (err) {
        console.error('[db err]', err);
        reject(err);
        return;
      }
      connection.query(query, params, (error, results) => {
        connection.destroy();
        // console.log('Cierre de solicitud');

        if (error) {
          console.error('[db query err]', error);
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  });
};

module.exports = {
  queryDatabase,
};
