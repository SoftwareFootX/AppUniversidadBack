const express = require('express');
const respuesta = require('../../red/respuestas');
const controlador = require('./controlador');

const router = express.Router();

router.get('/', universidades);
router.get('/:id', universidad);
router.post('/agregar_universidad', agregar_universidad);
router.post('/', actualizar_universidad);
router.delete('/:id', eliminar_universidad);

async function universidades(req, res, next) {
  try {
    const items = await controlador.universidades();
    respuesta.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function universidad(req, res, next) {
  try {
    const items = await controlador.universidad(req.params.id);
    respuesta.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function actualizar_universidad(req, res, next) {
  try {
    const items = await controlador.actualizar_universidad(req.body);
    const mensaje = 'Universidad actualizada';
    respuesta.success(req, res, mensaje, 201);
  } catch (error) {
    next(error);
  }
}

async function eliminar_universidad(req, res, next) {
  try {
    const id_a_eliminar = req.params.id;
    const items = await controlador.eliminar_universidad(id_a_eliminar);
    if (items.affectedRows === 1) {
      respuesta.success(
        req,
        res,
        'Universidad eliminada correctamente',
        200,
        id_a_eliminar,
        items.affectedRows,
      );
    } else {
      respuesta.success(
        req,
        res,
        'No se encontro la universidad',
        404,
        id_a_eliminar,
        items.affectedRows,
      );
    }
  } catch (error) {
    next(error);
  }
}

async function agregar_universidad(req, res, next) {
  try {
    const items = await controlador.agregar_universidad(req.body);
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
