const jwt = require("jsonwebtoken");
//Middleward de verificacion de token
let verificarToken = (req, res, next) => {
  //Captando data de los headers con nombre Authorization
  let token = req.get("Authorization");
  jwt.verify(token, process.env.SEED, (err, data) => {
    console.log(process.env.SEED);
    if (err) {
      return res.status(401).json({
        ok: false,
        err,
      });
    }
    req.usuario = data.usuario;
    next();
  });
};

let verificarRoll = (req, res, next) => {
  let { usuario } = req;
  if (usuario.role === "ADMIN_ROLE") {
    next();
  } else {
    return res.json({
      ok: false,
      message: "Usted no es administrador",
    });
  }
};
module.exports = { verificarToken, verificarRoll };
