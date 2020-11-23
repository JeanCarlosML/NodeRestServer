const express = require("express");
const {
  usuarioGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
} = require("../controllers/usuario.controller");
//Midellwares para validar token y roll
const {
  verificarToken,
  verificarRoll,
} = require("../middlewares/autenticacion");
const { uploadFile } = require("../middlewares/multer");

const router = express.Router();

router.get("/usuario", [verificarToken], usuarioGet);

router.post("/usuario", [verificarToken, verificarRoll], usuarioPost);

router.put("/usuario/:id", [verificarToken, verificarRoll , uploadFile], usuarioPut);

router.delete("/usuario/:id", [verificarToken, verificarRoll], usuarioDelete);

module.exports = router;
