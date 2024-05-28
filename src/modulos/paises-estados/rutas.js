const express = require('express');
const respuesta = require('../../red/respuestas');
const controlador = require('./controlador');

const router = express.Router();

router.get('/', paises_todos);
router.get('/estados_por_pais/:fk_pais', estados_por_pais);

async function paises_todos(req, res, next) {
  try {
    const items = await controlador.paises_todos();
    respuesta.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function estados_por_pais(req, res, next) {
  try {
    const items = await controlador.estados_por_pais(req.params.fk_pais);
    respuesta.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
