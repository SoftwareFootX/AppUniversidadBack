const express = require('express');
const config = require('./src/config');
const cors = require('cors');

const alumnos = require('./src/modulos/alumnos/rutas');
const universidad = require('./src/modulos/universidad/rutas');
const paises = require('./src/modulos/paises-estados/rutas');
const estados = require('./src/modulos/paises-estados/rutas');

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
app.use('/api/universidad', universidad);
app.use('/api/paises', paises);
app.use('/api/estados', estados);

module.exports = app;
