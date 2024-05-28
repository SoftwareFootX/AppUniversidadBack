const db = require('../../DB/paises-estados/mysql');

const TABLA_PAIS = 'tpaises';
const TABLA_ESTADOS = 'testados_paises';

const paises_todos = () => {
  return db.paises_todos(TABLA_PAIS);
};

const estados_por_pais = fk_pais => {
  return db.estados_por_pais(TABLA_ESTADOS, fk_pais);
};

module.exports = {
  paises_todos,
  estados_por_pais,
};
