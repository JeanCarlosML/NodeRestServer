const routerGlobal = require("express").Router();

const routersUser = require("../routes/usuario.routes");
const routerLogin = require("../routes/login.routes");
const routerCategoria = require("../routes/categoria.routes");

routerGlobal.use(routersUser);
routerGlobal.use(routerLogin);
routerGlobal.use(routerCategoria);
module.exports = routerGlobal;
