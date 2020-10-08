require("./config/config");
const mongoDB = require("./config/conexion");
const express = require("express");
const cors = require("cors");
//Importacion de rutas
const routersUser = require("./routes/usuario.routes");
const routerLogin = require("./routes/login.routes");
const morgan = require("morgan");

//Instancia de express
const app = express();

//Enable cors
app.use(cors());

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

// Midell ware de rutas
app.use(routersUser);
app.use(routerLogin);

//
app.use(morgan("dev"));

app.listen(process.env.PORT, () => {
  console.log(`Escuchando en el puerto ${process.env.PORT}`);
});
