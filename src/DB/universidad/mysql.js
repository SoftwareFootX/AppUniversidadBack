const {conexion} = require('../conexion');
const bcrypt = require('bcrypt');

function administradores(tabla) {
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}

function actualizar_admin(tabla, data) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `UPDATE ${tabla} SET ? WHERE idusuarios_universidad = ?`,
      [data, data.idusuarios_universidad],
      (error, result) => {
        return error ? reject(error) : resolve(result);
      },
    );
  });
}

function eliminar_admin(tabla, id) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `DELETE FROM ${tabla} WHERE idusuarios_universidad = ?`,
      id,
      (error, result) => {
        if (error) {
          return reject(error);
        } else {
          console.log('Usuario eliminado correctamente');
          return resolve(result);
        }
      },
    );
  });
}

const login_admin = (tabla, data) => {
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT * FROM ${tabla} WHERE usu_username = ?`,
      [data.usu_username],
      (error, results) => {
        if (error) return reject(error);
        if (results.length === 0) {
          return resolve([console.log('No se encontro ningun usuario')]);
        }
        const user = results[0];
        const passwordMatch = bcrypt.compareSync(
          data.usu_password, // no encriptado
          user.usu_password, // encriptado
        );
        if (!passwordMatch) {
          return resolve([console.log('Contraseña incorrecta')]);
        }
        console.log('Usuario logueado exitosamente');
        resolve(user);
      },
    );
  });
};

function registro_admin(tabla, data) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT * FROM ${tabla} WHERE usu_mail = ?`,
      [data.usu_mail],
      (error, results) => {
        if (error) return reject(error);
        if (results.length > 0) {
          const err = new Error('mail_repetida');
          err.status = 400;
          return reject(err);
        }
        conexion.query(
          `SELECT * FROM ${tabla} WHERE usu_username = ?`,
          [data.usu_username],
          (error, results) => {
            if (error) return reject(error);

            if (results.length > 0) {
              const err = new Error('user_repetido');
              err.status = 400;
              return reject(err);
            }
            const usu_password = data.usu_password;
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(usu_password, salt);
            data.usu_password = hash;
            conexion.query(
              `INSERT INTO ${tabla} SET ?`,
              data,
              (error, result) => {
                if (error) return reject(error);
                conexion.query(
                  `SELECT * FROM ${tabla} WHERE idusuarios_universidad = ?`,
                  [result.insertId],
                  (error, results) => {
                    if (error) return reject(error);
                    console.log('Usuario registrado exitosamente');
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
  administradores,
  actualizar_admin,
  eliminar_admin,
  login_admin,
  registro_admin,
};
