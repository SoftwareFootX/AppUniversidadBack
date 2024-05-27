const app = require('./app');

// Verificar servidor inicializado correctamente:

app.listen(app.get('port'), () => {
  console.log('Servidor escuchando en el puerto', app.get('port'));
});
