const jwt = require('jsonwebtoken');
const config = require('../config');

const secret = config.app.port;

// Middleware para verificar el token
const authToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // No autorizado
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Prohibido
    }

    req.user = user;
    next();
  });
};
module.exports = {authToken};
