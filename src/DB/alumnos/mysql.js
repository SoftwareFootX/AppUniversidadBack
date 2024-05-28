const bcrypt = require('bcrypt');
const {conexion} = require('../conexion');

function alumnos(tabla) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT * FROM ${tabla} order by apellido asc`,
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );
  });
}

function actualizar_alumno(tabla, data) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `UPDATE ${tabla} SET ? WHERE idalumnos = ?`,
      [data, data.idalumnos],
      (error, result) => {
        return error ? reject(error) : resolve(result);
      },
    );
  });
}

function eliminar_alumno(tabla, id) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `DELETE FROM ${tabla} WHERE idalumnos = ?`,
      id,
      (error, result) => {
        return error ? reject(error) : resolve(result);
      },
    );
  });
}

function login_alumno(tabla, data) {
  console.log(data);
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT * FROM ${tabla} WHERE mail = ?`,
      [data.mail],
      (error, results) => {
        if (error) return reject(error);
        if (results.length === 0) {
          return resolve([console.log('No se encontro ningun usuario')]);
        }
        const user = results[0];
        const passwordMatch = bcrypt.compareSync(
          data.contrasenia, // no encriptado
          user.contrasenia, // encriptado
        );
        if (!passwordMatch) {
          return resolve([console.log('Contraseña incorrecta')]);
        }
        resolve({user});
      },
    );
  });
}

function registro_alumno(tabla, data) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT * FROM ${tabla} WHERE mail = ?`,
      [data.mail],
      (error, results) => {
        if (error) return reject(error);
        if (results.length > 0) {
          const err = new Error('mail_repetida');
          err.status = 400;
          return reject(err);
        }
        conexion.query(
          `SELECT * FROM ${tabla} WHERE matricula = ?`,
          [data.matricula],
          (error, results) => {
            if (error) return reject(error);

            if (results.length > 0) {
              const err = new Error('matricula_repetida');
              err.status = 400;
              return reject(err);
            }
            const contrasenia = data.contrasenia;
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(contrasenia, salt);
            data.contrasenia = hash;

            conexion.query(
              `INSERT INTO ${tabla} SET ?`,
              data,
              (error, result) => {
                if (error) return reject(error);
                conexion.query(
                  `SELECT * FROM ${tabla} WHERE idalumnos = ?`,
                  [result.insertId],
                  (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                  },
                );
              },
            );
          },
        );
      },
    );
  });
}

module.exports = {
  alumnos,
  actualizar_alumno,
  eliminar_alumno,
  login_alumno,
  registro_alumno,
};
