require('dotenv').config({path: './.env'});

// Configuración de variables de entorno:

module.exports = {
  app: {
    port: process.env.PORT || 4000,
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
  },
};
