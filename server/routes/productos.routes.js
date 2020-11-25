const express = require("express");
const router = express.Router();
const {
  productoGet,
  productoGetOne,
  productoPost,
  productoUpdate,
  productoDelete,buscarProductos
} = require("../controllers/producto.controller");
const { verificarToken } = require("../middlewares/autenticacion");

router.get("/producto", productoGet);
router.get("/producto/:id", productoGetOne);
router.get("/producto/buscar/:producto",[verificarToken], buscarProductos);
router.post("/producto", [verificarToken], productoPost);
router.put("/producto/:id", [verificarToken], productoUpdate);
router.delete("/producto/:id", [verificarToken], productoDelete);

module.exports = router;
