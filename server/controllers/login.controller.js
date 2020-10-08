const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario.model");
const jwt = require("jsonwebtoken");

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
process.env.SEED = process.env.SEED || "este-es-el-seed-desarrollo";

const loginPost = (req, res) => {
  const { body } = req;
  Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "(Usuario) o contraseña incorrectos",
        },
      });
    }

    if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Usuario o (contraseña) incorrectos",
        },
      });
    }

    let token = jwt.sign(
      {
        usuario: usuarioDB,
      },
      process.env.SEED,
      { expiresIn: process.env.CADUCIDAD_TOKEN }
    );

    return res.json({
      ok: true,
      usuario: usuarioDB,
      token,
    });
  });
};

module.exports = { loginPost };
