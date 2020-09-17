const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json("hola json");
});

router.get("/usuario", (req, res) => {
  res.json("Get usuario");
});
router.post("/usuario", (req, res) => {
  let body = req.body;
  if (body.nombre === undefined) {
    res.status(400).json({
      ok: false,
      mensaje: "El nombre es necesario",
    });
  } else {
    res.status(200).json({
      body: body,
    });
  }
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
