const routerGlobal = require("express").Router();

const routersUser = require("../routes/usuario.routes");
const routerLogin = require("../routes/login.routes");

routerGlobal.use(routersUser);
routerGlobal.use(routerLogin);

module.exports = routerGlobal ;
