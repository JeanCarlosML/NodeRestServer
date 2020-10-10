const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario.model");
const jwt = require("jsonwebtoken");


//router.post("/login", loginPost);
const loginPost = (req, res) => {
  const { email, password } = req.body;
  Usuario.findOne({ email }, (err, usuarioDB) => {
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
    if (!bcrypt.compareSync(password, usuarioDB.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Usuario o (contraseña) incorrectos",
        },
      });
    }
    let { role, estado, google, _id, nombre, email } = usuarioDB;
    //Generando token con informacion
    let token = jwt.sign(
      {
        usuario: usuarioDB,
      },
      process.env.SEED,
      { expiresIn: process.env.CADUCIDAD_TOKEN }
    );
    return res.json({
      ok: true,
      usuario: { role, estado, google, _id, nombre, email },
      token,
    });
  });
};

module.exports = { loginPost };
