const express = require("express");
const userController = require("../controllers/usuario.controller");
const usuarioController = require("../controllers/usuario.controller");
const router = express.Router();

router.get("/", userController.usuarioGetBasic);

router.get("/usuario", userController.usuarioGet);

router.post("/usuario", usuarioController.usuarioPost);

router.put("/usuario/:id", usuarioController.usuarioPut);

router.delete("/usuario/:id", usuarioController.usuarioDelete);

module.exports = router;
