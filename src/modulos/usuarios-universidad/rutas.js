const express = require('express');
const respuesta = require('../../red/respuestas');
const controlador = require('./controlador');
const {authToken} = require('../../middlewares/authToken');

const router = express.Router();

router.get('/', authToken, usuarios_uni);
router.get('/usuario_por_id/:id', authToken, usuario_por_id);
router.post('/login_usuario_uni', login_usuario_uni);
router.post('/agregar_usuario_uni', authToken, agregar_usuario_uni);
router.post('/', authToken, actualizar_usuario_uni);
router.delete('/:id', authToken, eliminar_usuario_uni);

async function usuarios_uni(req, res, next) {
  try {
    const items = await controlador.usuarios_uni();
    respuesta.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function usuario_por_id(req, res, next) {
  try {
    const id = req.params.id;
    const items = await controlador.usuario_por_id(id);
    respuesta.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function actualizar_usuario_uni(req, res, next) {
  try {
    const items = await controlador.actualizar_usuario_uni(req.body);
    const mensaje = 'Admin actualizado';
    respuesta.success(req, res, mensaje, 201);
  } catch (error) {
    next(error);
  }
}

async function eliminar_usuario_uni(req, res, next) {
  try {
    const id_a_eliminar = req.params.id;
    const items = await controlador.eliminar_usuario_uni(id_a_eliminar);
    if (items.affectedRows === 1) {
      respuesta.success(
        req,
        res,
        'Usuario eliminado correctamente',
        200,
        id_a_eliminar,
        items.affectedRows,
      );
    } else {
      respuesta.success(
        req,
        res,
        'No se encontro el usuario',
        404,
        id_a_eliminar,
        items.affectedRows,
      );
    }
  } catch (error) {
    next(error);
  }
}

async function login_usuario_uni(req, res, next) {
  try {
    const items = await controlador.login_usuario_uni(req.body);
    if (items.length === 0) {
      return respuesta.success(req, res, 'Nombre de usuario no existe.', 401);
    }
    respuesta.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function agregar_usuario_uni(req, res, next) {
  try {
    const items = await controlador.agregar_usuario_uni(req.body);
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
