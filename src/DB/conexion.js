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

module.exports = {
  conexion
};
