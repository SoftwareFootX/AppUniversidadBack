const {queryDatabase} = require('../conexion');
const bcrypt = require('bcrypt');

function usuarios_uni(tabla) {
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

function actualizar_usuario_uni(tabla, data) {
  return new Promise((resolve, reject) => {
    queryDatabase(`UPDATE ${tabla} SET ? WHERE idusuario_universidad = ?`, [
      data,
      data.idusuario_universidad,
    ])
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        console.error('Error al actualizar usuario:', error);
        reject(error);
      });
  });
}

function eliminar_usuario_uni(tabla, id) {
  return new Promise((resolve, reject) => {
    queryDatabase(`DELETE FROM ${tabla} WHERE idusuario_universidad = ?`, id)
      .then(result => {
        console.log('Usuario eliminado correctamente');
        resolve(result);
      })
      .catch(error => {
        console.error('Error al eliminar usuario:', error);
        reject(error);
      });
  });
}

const login_usuario_uni = (tabla, data) => {
  return new Promise((resolve, reject) => {
    queryDatabase(`SELECT * FROM ${tabla} WHERE usu_username = ?`, [
      data.usu_username,
    ])
      .then(results => {
        if (results.length === 0) {
          console.log('No se encontró ningún usuario');
          resolve(null);
        } else {
          const user = results[0];
          const passwordMatch = bcrypt.compareSync(
            data.usu_password, // no encriptado
            user.usu_password, // encriptado
          );
          if (!passwordMatch) {
            console.log('Contraseña incorrecta');
            resolve(null);
          } else {
            console.log('Usuario logueado exitosamente');
            resolve(user);
          }
        }
      })
      .catch(error => {
        console.error('Error en la consulta:', error);
        reject(error);
      });
  });
};

function agregar_usuario_uni(tabla, data) {
  return new Promise((resolve, reject) => {
    queryDatabase(`SELECT * FROM ${tabla} WHERE usu_mail = ?`, [data.usu_mail])
      .then(results => {
        if (results.length > 0) {
          const err = new Error('mail_repetida');
          err.status = 400;
          throw err;
        } else {
          return queryDatabase(
            `SELECT * FROM ${tabla} WHERE usu_username = ?`,
            [data.usu_username],
          );
        }
      })
      .then(results => {
        if (results.length > 0) {
          const err = new Error('user_repetido');
          err.status = 400;
          throw err;
        } else {
          const usu_password = data.usu_password;
          const saltRounds = 10;
          const salt = bcrypt.genSaltSync(saltRounds);
          const hash = bcrypt.hashSync(usu_password, salt);
          data.usu_password = hash;
          return queryDatabase(`INSERT INTO ${tabla} SET ?`, data);
        }
      })
      .then(result => {
        return queryDatabase(
          `SELECT * FROM ${tabla} WHERE idusuario_universidad = ?`,
          [result.insertId],
        );
      })
      .then(results => {
        console.log('Usuario registrado exitosamente');
        resolve(results);
      })
      .catch(error => {
        console.error('Error en el registro:', error);
        reject(error);
      });
  });
}

module.exports = {
  usuarios_uni,
  actualizar_usuario_uni,
  eliminar_usuario_uni,
  login_usuario_uni,
  agregar_usuario_uni,
};
