const express = require('express');
const respuesta = require('../../red/respuestas');
const controlador = require('./controlador');

const router = express.Router();

router.get('/', administradores);
router.post('/login_admin', login_admin);
router.post('/registro_admin', registro_admin);
router.post('/', actualizar_admin);
router.delete('/:id', eliminar_admin);

async function administradores(req, res, next) {
  try {
    const items = await controlador.administradores();
    respuesta.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function actualizar_admin(req, res, next) {
  try {
    const items = await controlador.actualizar_admin(req.body);
    const mensaje = 'Admin actualizado';
    respuesta.success(req, res, mensaje, 201);
  } catch (error) {
    next(error);
  }
}

async function eliminar_admin(req, res, next) {
  try {
    const id_a_eliminar = req.params.id;
    const items = await controlador.eliminar_admin(id_a_eliminar);
    if (items.affectedRows === 1) {
      respuesta.success(
        req,
        res,
        'Administrador eliminado correctamente',
        200,
        id_a_eliminar,
        items.affectedRows,
      );
    } else {
      respuesta.success(
        req,
        res,
        'No se encontro el administrador',
        404,
        id_a_eliminar,
        items.affectedRows,
      );
    }
  } catch (error) {
    next(error);
  }
}

async function login_admin(req, res, next) {
  try {
    const items = await controlador.login_admin(req.body);
    if (items.length === 0) {
      return respuesta.success(req, res, 'Nombre de usuario no existe.', 401);
    }
    respuesta.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function registro_admin(req, res, next) {
  try {
    const items = await controlador.registro_admin(req.body);
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
