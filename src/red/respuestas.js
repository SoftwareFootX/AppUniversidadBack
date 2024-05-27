// Configuracion de respuestas del servidor:

exports.success = function (
    req,
    res,
    mensaje = '',
    status = 200,
    id,
    affectedRows,
  ) {
    res.status(status).send({
      error: false,
      status: status,
      body: mensaje,
      id,
      affectedRows,
    });
  };
  
  exports.error = function (req, res, mensaje = '', status = 500) {
    res.status(status).send({
      error: true,
      status: status,
      body: mensaje,
    });
  };
  