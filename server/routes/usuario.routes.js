const express = require("express");
const userController = require("../controllers/usuario.controller");
const usuarioController = require("../controllers/usuario.controller");
const router = express.Router();
//Midellwares
const {
  verificarToken,
  verificarRoll,
} = require("../middlewares/autenticacion");

router.get("/", verificarToken, userController.usuarioGetBasic);

router.get("/usuario", [verificarToken], userController.usuarioGet);

router.post(
  "/usuario",
  [verificarToken, verificarRoll],
  usuarioController.usuarioPost
);

router.put(
  "/usuario/:id",
  [verificarToken, verificarRoll],
  usuarioController.usuarioPut
);

router.delete(
  "/usuario/:id",
  [verificarToken, verificarRoll],
  usuarioController.usuarioDelete
);

module.exports = router;
