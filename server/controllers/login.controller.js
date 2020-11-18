const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario.model");
const jwt = require("jsonwebtoken");

//Dependencias para google sign
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

//router.post("/login", loginPost);
const loginPost = async (req, res) => {
  try {
    const { email, password } = req.body;
    let usuarioDB = await Usuario.findOne({ email });
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
  } catch (err) {
    return res.status(500).json({
      ok: false,
      err,
    });
  }
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
  try {
    let { idtoken } = req.body;
    let googleUser = await verify(idtoken);
    let usuarioDB = await Usuario.findOne({ email: googleUser.email });
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
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      ok: false,
      err,
    });
    return res.status(500).json({
      ok: false,
      err,
    });
  }
};

module.exports = { loginPost, loginPostGoogle };
