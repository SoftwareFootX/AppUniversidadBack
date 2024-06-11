const express = require('express');
const respuesta = require('../../../red/respuestas');
const controlador = require('./controlador');
const {authToken} = require('../../../middlewares/authToken');

const router = express.Router();

router.post('/actualizar_ficha_clinica', authToken, actualizar_ficha_clinica);
router.get('/', authToken, ficha_clinica_alumno);
router.get('/ficha_clinica_por_id/:id', authToken, ficha_clinica_por_id);
router.delete('/ficha_clinica_por_id/:id', authToken, eliminar_ficha_clinica);

async function ficha_clinica_alumno(req, res, next) {
  try {
    const items = await controlador.ficha_clinica_alumno(req.body);
    respuesta.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function ficha_clinica_por_id(req, res, next) {
  try {
    const items = await controlador.ficha_clinica_por_id(req.params.id);
    //respuesta.success(req, res, mensaje, 201);
    respuesta.success(req, res, items, 200);
  } catch (error) {
    next(error);
  }
}
async function actualizar_ficha_clinica(req, res, next) {
  try {
    const items = await controlador.actualizar_ficha_clinica(req.body);
    const mensaje = 'Ficha actualizada';
    respuesta.success(req, res, mensaje, 201);
  } catch (error) {
    next(error);
  }
}

async function eliminar_ficha_clinica(req, res, next) {
  try {
    const id_a_eliminar = req.params.id;
    const items = await controlador.eliminar_ficha_clinica(id_a_eliminar);
    if (items.affectedRows === 1) {
      respuesta.success(
        req,
        res,
        'Ficha eliminada correctamente',
        200,
        id_a_eliminar,
        items.affectedRows,
      );
    } else {
      respuesta.success(
        req,
        res,
        'No se encontro la ficha',
        404,
        id_a_eliminar,
        items.affectedRows,
      );
    }
  } catch (error) {
    next(error);
  }
}

module.exports = router;
