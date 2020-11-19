//Configuracion de variables de entorno
require("./config/config");
//Instancia de BD
require("./config/conexion");
const express = require("express");
const cors = require("cors");
const path = require("path");
//Importacion de rutas
const routerGlobal = require("./config/routes");
//Morgan para desarrollo / tiempo de respuesta de peticion
const morgan = require("morgan");
//Instancia de express
const app = express();
//Cors libres para peticion de cualquier dominio
app.use(cors());

//Public
app.use(express.static(path.resolve(__dirname, "../public")));

//Modulo path para unir rutas y especificar el directorio publico
console.log(path.resolve(__dirname, "../public"));
//Mostrar tipos de peticiones realizadas
app.use(morgan("dev"));

// parse application/x-www-form-urlencoded para data recibida
app.use(express.urlencoded({ extended: false }));

// parse application/json para data enviada
app.use(express.json());

// Midellware de rutas
app.use(routerGlobal);

app.listen(process.env.PORT, () => {
  console.log(`Escuchando en el puerto ${process.env.PORT}`);
});
