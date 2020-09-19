require("./config/config");
const mongoDB = require("./config/conexion");
const express = require("express");
//Importacion de rutas
const routers = require("./routes/usuario");

//Instancia de express
const app = express();

//Instancia de BD
mongoDB
  .conectarBD()
  .then((res) => {
    console.log("Base de datos conectada correctamente");
  })
  .catch((e) => {
    console.log("Error al conectar a la base de datos");
  });
// parse application/x-www-form-urlencoded para data recibida
app.use(express.urlencoded({ extended: false }));

// parse application/json para data enviada
app.use(express.json());

app.use(routers);

app.listen(process.env.PORT, () => {
  console.log(`Escuchando en el puerto ${process.env.PORT}`);
});
