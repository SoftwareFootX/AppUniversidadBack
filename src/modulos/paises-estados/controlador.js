const db = require('../../DB/paises-estados/mysql');

const {tablas_paises_estados} = require('../../DB/config.json');
const {paises, estados} = tablas_paises_estados;

const paises_todos = () => {
  return db.paises_todos(paises);
};

const estados_por_pais = fk_pais => {
  return db.estados_por_pais(estados, fk_pais);
};

module.exports = {
  paises_todos,
  estados_por_pais,
};
