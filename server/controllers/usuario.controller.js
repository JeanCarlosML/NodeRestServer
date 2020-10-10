const Usuario = require("../models/usuario.model");
const bcrypt = require("bcrypt");
const _ = require("underscore");

//router.get("/usuario", [verificarToken], usuarioGet);
const usuarioGet = (req, res) => {
  let desde = Number(req.query.skip) || 0;
  let limite = Number(req.query.limite) || 10;
  Usuario.find({}, "nombre email role")
    .skip(desde)
    .limit(limite)
    .exec((error, usuarios) => {
      if (error) {
        return res.status(400).json({
          ok: false,
          error,
        });
      }
      Usuario.countDocuments({}, (error, count) => {
        error
          ? res.status(400).json({
              ok: false,
              error,
            })
          : res.json({
              ok: true,
              conteo: count,
              usuarios,
            });
      });
    });
};

//router.post("/usuario", [verificarToken, verificarRoll], usuarioPost);
const usuarioPost = (req, res) => {
  let { nombre, email, password, role } = req.body;
  let usuario = new Usuario({
    nombre,
    email,
    password: bcrypt.hashSync(password, 10),
    role,
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
};

//router.put("/usuario/:id", [verificarToken, verificarRoll], usuarioPut);
const usuarioPut = (req, res) => {
  let { id } = req.params;
  let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);
  Usuario.findByIdAndUpdate(
    id,
    body,
    { runValidators: true, new: true, context: "query" },
    (error, usuarioDB) => {
      if (error) {
        return res.status(400).json({
          ok: false,
          error,
        });
      }
      let usuario = _.pick(usuarioDB, [
        "nombre",
        "email",
        "img",
        "role",
        "estado",
      ]);
      return res.json({
        ok: true,
        usuario,
      });
    }
  );
};

//router.delete("/usuario/:id", [verificarToken, verificarRoll], usuarioDelete);
const usuarioDelete = (req, res) => {
  const { id } = req.params;
  const cambiarEstado = {
    estado: false,
  };
  Usuario.findByIdAndUpdate(
    id,
    cambiarEstado,
    { new: true },
    (err, usuarioBorrado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      if (usuarioBorrado == null) {
        return res.status(400).json({
          ok: false,
          message: "Usuario no encontrado",
        });
      }
      return res.json({
        ok: true,
        usuario: usuarioBorrado,
      });
    }
  );
};

module.exports = {
  usuarioGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
};
