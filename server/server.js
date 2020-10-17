require("./config/config");
//Instancia de BD
require("./config/conexion");
const express = require("express");
const cors = require("cors");
const path = require("path");
//Importacion de rutas
const routersUser = require("./routes/usuario.routes");
const routerLogin = require("./routes/login.routes");
const morgan = require("morgan");

//Instancia de express
const app = express();

//Cors libres para peticion de cualquier dominio
app.use(cors());

//Public
app.use(express.static(path.resolve(__dirname, "../public")));

//Mostrar tipos de peticiones realizadas
app.use(morgan("dev"));

// parse application/x-www-form-urlencoded para data recibida
app.use(express.urlencoded({ extended: false }));

// parse application/json para data enviada
app.use(express.json());

// Midellware de rutas
app.use(routersUser);
app.use(routerLogin);

app.listen(process.env.PORT, () => {
  console.log(`Escuchando en el puerto ${process.env.PORT}`);
});
