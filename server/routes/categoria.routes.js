const express = require("express");
const router = express.Router();
const {
  categoriaDelete,
  categoriaPost,
  categoriaGet,
  categoriaUpdate,
  categoriaGetOne
} = require("../controllers/categoria.controller");
const { verificarToken } = require("../middlewares/autenticacion");

router.get("/categoria", categoriaGet);
router.get("/categoria/:id", categoriaGetOne);
router.post("/categoria", [verificarToken], categoriaPost);
router.put("/categoria/:id", [verificarToken], categoriaUpdate);
router.delete("/categoria/:id", [verificarToken], categoriaDelete);

module.exports = router;
