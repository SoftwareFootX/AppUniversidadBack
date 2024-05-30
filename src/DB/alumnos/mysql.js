const bcrypt = require('bcrypt');
const {queryDatabase} = require('../conexion');

function alumnos(tabla) {
  return new Promise((resolve, reject) => {
    queryDatabase(`SELECT * FROM ${tabla} ORDER BY apellido ASC`)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function actualizar_alumno(tabla, data) {
  return new Promise((resolve, reject) => {
    queryDatabase(`UPDATE ${tabla} SET ? WHERE idalumnos = ?`, [
      data,
      data.idalumnos,
    ])
      .then(result => {
        resolve(result);
        console.log(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function fichas(tabla) {
  return new Promise((resolve, reject) => {
    queryDatabase(`SELECT * FROM ${tabla}`)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function ficha_por_id(tabla, id) {
  return new Promise((resolve, reject) => {
    queryDatabase(`SELECT * FROM ${tabla} WHERE fk_alumno = ?`, [id])
      .then(result => {
        resolve(result);
        console.log(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function agregar_ficha(tabla, data) {
  console.log('Nombre tabla: ', tabla, data);

  return new Promise((resolve, reject) => {
    queryDatabase(`INSERT INTO ${tabla} SET ?`, data)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function actualizar_ficha(tabla, data) {
  return new Promise((resolve, reject) => {
    queryDatabase(`SELECT * FROM ${tabla} WHERE fk_alumno = ?`, [
      data.fk_alumno,
    ])
      .then(results => {
        if (results.length === 0) {
          console.log('No se encontró ficha.... Agrega');
          //results = agregar_ficha(tabla, data);
          agregar_ficha(tabla, data);
          resolve(results);
        } else {
          console.log('Encontró ficha.... Actualiza');
          queryDatabase(`UPDATE ${tabla} SET ? WHERE fk_alumno = ?`, [
            data,
            data.fk_alumno,
          ]).then(result => {
            resolve(result);
            console.log(result);
          });
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function eliminar_alumno(tabla, id) {
  return new Promise((resolve, reject) => {
    queryDatabase(`DELETE FROM ${tabla} WHERE idalumnos = ?`, id)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function login_alumno(tabla, data) {
  return new Promise((resolve, reject) => {
    queryDatabase(`SELECT * FROM ${tabla} WHERE mail = ?`, [data.mail])
      .then(results => {
        if (results.length === 0) {
          console.log('No se encontró ningún usuario');
          resolve(results);
        } else {
          const user = results[0];
          const passwordMatch = bcrypt.compareSync(
            data.contrasenia,
            user.contrasenia,
          );
          if (!passwordMatch) {
            console.log('Contraseña incorrecta');
            resolve(results);
          } else {
            resolve({user});
          }
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function agregar_alumno(tabla, data) {
  return new Promise((resolve, reject) => {
    queryDatabase(`SELECT * FROM ${tabla} WHERE mail = ?`, [data.mail])
      .then(results => {
        if (results.length > 0) {
          const err = new Error('mail_repetida');
          err.status = 400;
          throw err;
        } else {
          return queryDatabase(`SELECT * FROM ${tabla} WHERE matricula = ?`, [
            data.matricula,
          ]);
        }
      })
      .then(results => {
        if (results.length > 0) {
          const err = new Error('matricula_repetida');
          err.status = 400;
          throw err;
        } else {
          const contrasenia = data.contrasenia;
          const saltRounds = 10;
          const salt = bcrypt.genSaltSync(saltRounds);
          const hash = bcrypt.hashSync(contrasenia, salt);
          data.contrasenia = hash;
          return queryDatabase(`INSERT INTO ${tabla} SET ?`, data);
        }
      })
      .then(result => {
        return queryDatabase(`SELECT * FROM ${tabla} WHERE idalumnos = ?`, [
          result.insertId,
        ]);
      })
      .then(results => {
        resolve(results);
      })
      .catch(error => {
        reject(error);
      });
  });
}

module.exports = {
  actualizar_ficha,
  alumnos,
  ficha_por_id,
  fichas,
  actualizar_alumno,
  eliminar_alumno,
  login_alumno,
  agregar_alumno,
  agregar_ficha,
};
