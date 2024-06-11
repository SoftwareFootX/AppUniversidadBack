const express = require('express');
const respuesta = require('../../../red/respuestas');
const controlador = require('./controlador');
const {authToken} = require('../../../middlewares/authToken');

const router = express.Router();

router.get('/', authToken, fichas_biomecanica_footx);
router.get(
  '/ficha_biomecanica_footx_por_id/:id',
  authToken,
  ficha_biomecanica_footx_por_id,
);
router.post(
  '/agregar_ficha_biomecanica_footx',
  authToken,
  agregar_ficha_biomecanica_footx,
);
router.post('/', authToken, actualizar_ficha_biomecanica_footx);
router.delete('/:id', authToken, eliminar_ficha_biomecanica_footx);

async function fichas_biomecanica_footx(req, res, next) {
  try {
    const items = await controlador.fichas_biomecanica_footx();
    respuesta.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function ficha_biomecanica_footx_por_id(req, res, next) {
  try {
    const id = req.params.id;
    const items = await controlador.ficha_biomecanica_footx_por_id(id);
    respuesta.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function actualizar_ficha_biomecanica_footx(req, res, next) {
  try {
    const items = await controlador.actualizar_ficha_biomecanica_footx(
      req.body,
    );
    const mensaje = 'Ficha Biomecanica actualizada';
    respuesta.success(req, res, mensaje, 201);
  } catch (error) {
    next(error);
  }
}

async function eliminar_ficha_biomecanica_footx(req, res, next) {
  try {
    const id_a_eliminar = req.params.id;
    const items = await controlador.eliminar_ficha_biomecanica_footx(
      id_a_eliminar,
    );
    if (items.affectedRows === 1) {
      respuesta.success(
        req,
        res,
        'Ficha Biomecanica eliminada correctamente',
        200,
        id_a_eliminar,
        items.affectedRows,
      );
    } else {
      respuesta.success(
        req,
        res,
        'No se encontro la ficha biomecanica',
        404,
        id_a_eliminar,
        items.affectedRows,
      );
    }
  } catch (error) {
    next(error);
  }
}

async function agregar_ficha_biomecanica_footx(req, res, next) {
  try {
    const items = await controlador.agregar_ficha_biomecanica_footx(req.body);
    if (items) {
      // Se encontraron elementos en items
      return respuesta.success(req, res, items, 200);
    } else {
      // No se encontraron elementos en items
      return respuesta.success(req, res, 'No se encontraron elementos', 404);
    }
  } catch (err) {
    respuesta.error(req, res, err.message, err.status || 500);
    next(err);
  }
}

module.exports = router;
