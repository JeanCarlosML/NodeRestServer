const express = require("express");
const Usuario = require("../models/usuario");

const router = express.Router();

router.get("/", (req, res) => {
  res.json("hola json");
});

router.get("/usuario", (req, res) => {
  res.json("Get usuario");
});
router.post("/usuario", (req, res) => {
  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: body.password,
    role: body.role,
  });

  usuario.save((error, usuarioDB) => {
    if (error) {
      return res.status(400).json({
        ok: false,
        error,
      });
    }
    return res.json({
      ok: true,
      usuario: usuarioDB,
    });
  });
});

router.put("/usuario/:id", (req, res) => {
  let id = req.params.id;
  res.json({
    id,
  });
});
router.delete("/usuario:id", (req, res) => {
  res.json("Delete usuario");
});

module.exports = router;
