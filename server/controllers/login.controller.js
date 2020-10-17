const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario.model");
const jwt = require("jsonwebtoken");

//Dependencias para google sign
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

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

//Configuracion de google
async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const payload = ticket.getPayload(); //Informacion del usuario autenticado
  return {
    nombre: payload.name,
    email: payload.email,
    img: payload.picture,
    google: true,
  };
}

//router.post("/google", loginPost);
const loginPostGoogle = async (req, res) => {
  let { idtoken } = req.body;
  let googleUser = await verify(idtoken).catch((err) => {
    return res.status(403).json({
      ok: false,
      err,
    });
  });
  Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (usuarioDB) {
      if (usuarioDB.google === false) {
        return res.status(400).json({
          ok: false,
          error: {
            message: "Debe usar su autenticacion normal",
          },
        });
      } else {
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
      }
    }
  });
};

module.exports = { loginPost, loginPostGoogle };
