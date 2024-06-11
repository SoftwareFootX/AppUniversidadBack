const express = require('express');
const respuesta = require('../../red/respuestas');
const controlador = require('./controlador');
const {authToken} = require('../../middlewares/authToken');

const router = express.Router();

router.get('/', authToken, alumnos);
router.get('/alumno_por_id/:id', authToken, alumno_por_id);
router.post('/login_alumno', login_alumno);
router.post('/agregar_alumno', authToken, agregar_alumno);
router.post('/', authToken, actualizar_alumno);
router.delete('/:id', authToken, eliminar_alumno);

async function alumnos(req, res, next) {
  try {
    const items = await controlador.alumnos();
    respuesta.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function alumno_por_id(req, res, next) {
  try {
    const id = req.params.id;
    const items = await controlador.alumno_por_id(id);
    respuesta.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function actualizar_alumno(req, res, next) {
  try {
    const items = await controlador.actualizar_alumno(req.body);
    respuesta.success(
      req,
      res,
      'Sin errores',
      201,
      req.body.idalumnos,
      items.affectedRows,
    );
  } catch (error) {
    next(error);
  }
}

async function eliminar_alumno(req, res, next) {
  try {
    const id_a_eliminar = req.params.id;
    const items = await controlador.eliminar_alumno(id_a_eliminar);
    if (items.affectedRows === 1) {
      respuesta.success(
        req,
        res,
        'Alumno eliminado correctamente',
        200,
        id_a_eliminar,
        items.affectedRows,
      );
    } else {
      respuesta.success(
        req,
        res,
        'No se encontro el alumno',
        404,
        id_a_eliminar,
        items.affectedRows,
      );
    }
  } catch (error) {
    next(error);
  }
}

async function login_alumno(req, res, next) {
  try {
    const items = await controlador.login_alumno(req.body);
    if (items.length === 0) {
      return respuesta.success(req, res, 'Nombre de usuario no existe.', 401);
    }
    respuesta.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function agregar_alumno(req, res, next) {
  try {
    const items = await controlador.agregar_alumno(req.body);
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
