const jwt = require("jsonwebtoken");

//Middleward de verificacion de token
let verificarToken = async (req, res, next) => {
  try {
    //Captando data de los headers con nombre Authorization
    let token = req.get("Authorization"); //Descifrando informacion del token
    let decoded = jwt.verify(token, process.env.SEED);
    req.usuario = decoded.usuario;
    next();
  } catch (error) {
    return res.status(401).json({ ok: false, error });
  }
};

//Middleward de verificacion de roll
let verificarRoll = (req, res, next) => {
  let { usuario } = req;
  if (usuario.role === "ADMIN_ROLE") {
    next();
  } else {
    return res.json({ ok: false, message: "Usted no es administrador" });
  }
};

module.exports = { verificarToken, verificarRoll };
