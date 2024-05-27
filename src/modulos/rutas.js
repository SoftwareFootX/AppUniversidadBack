const express = require('express');
const respuesta = require('../red/respuestas');
const controlador = require('./controlador');

// Rutas:

const router = express.Router();

router.get('/', todos_los_alumnos);
router.post('/', registrar_actualizar_alumno);
router.delete('/:id', eliminar_alumno);

// Mostrar todos los datos de una tabla:

async function todos_los_alumnos(req, res, next) {
  try {
    const items = await controlador.todos_los_alumnos();
    respuesta.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

// Registrar/actualizar datos de una tabla:

async function registrar_actualizar_alumno(req, res, next) {
  try {
    const items = await controlador.registrar_actualizar_alumno(req.body);
    if (req.body.idalumnos === 0) {
      mensaje = `Alumno guardado`;
    } else {
      mensaje = `Alumno actualizado`;
    }
    respuesta.success(req, res, mensaje, 201);
  } catch (error) {
    next(error);
  }
}

// Eliminar datos de una tabla por id:

async function eliminar_alumno(req, res, next) {
    try {
      const id_a_eliminar = req.params.id;
      const items = await controlador.eliminar_alumno(id_a_eliminar);
      if (items.affectedRows === 1) {
        respuesta.success(
          req,
          res,
          'Item eliminado correctamente',
          200,
          id_a_eliminar,
          items.affectedRows,
        );
      } else {
        respuesta.success(
          req,
          res,
          'No se encontro el país',
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
