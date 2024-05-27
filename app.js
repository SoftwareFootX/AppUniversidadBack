const express = require('express');
const config = require('./src/config');
const cors = require('cors');

const alumnos = require('./src/modulos/rutas');

const app = express();

// Middleware para manejar solicitudes HTTP que envían datos mediante formularios HTML:

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('port', config.app.port);

//TODO: Revisar proteccion de solicitudes

//Configuración de CORS:

app.use(
  cors({
    origin: '*',
  }),
);

// Rutas
app.use('/api/alumnos', alumnos);

module.exports = app;
