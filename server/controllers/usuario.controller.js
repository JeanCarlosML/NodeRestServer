const Usuario = require("../models/usuario.model");
const bcrypt = require("bcrypt");
const _ = require("underscore");

//router.get("/usuario", [verificarToken], usuarioGet);
const usuarioGet = async (req, res) => {
  try {
    let desde = Number(req.query.skip) || 0;
    let limite = Number(req.query.limite) || 10;
    let usuarios = await Usuario.find({}, "nombre email role estado")
      .skip(desde)
      .limit(limite)
      .exec();
    let count = await Usuario.countDocuments({});
    res.status(200).json({
      ok: true,
      conteo: count,
      usuarios,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      error,
    });
  }
};

//router.post("/usuario", [verificarToken, verificarRoll], usuarioPost);
const usuarioPost = async (req, res) => {
  try {
    let { nombre, email, password, role } = req.body;
    let usuario = new Usuario({
      nombre,
      email,
      password: bcrypt.hashSync(password, 10),
      role,
    });
    let usuarioDB = await usuario.save();
    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      error,
    });
  }
};

//router.put("/usuario/:id", [verificarToken, verificarRoll], usuarioPut);
const usuarioPut = async (req, res) => {
  try {
    let { id } = req.params;
    let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);
    let usuarioDB = await Usuario.findByIdAndUpdate(id, body, {
      runValidators: true,
      new: true,
      context: "query",
    });
    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      error,
    });
  }
};

//router.delete("/usuario/:id", [verificarToken, verificarRoll], usuarioDelete);
const usuarioDelete = async(req, res) => {
  try {
    let { id } = req.params;
    const cambiarEstado = {
      estado: false,
    };
    let usuarioDB = await Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true });
    if (usuarioDB == null) {
      res.status(400).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    } else {
      res.json({
        ok: true,
        usuario: usuarioDB,
      });
    }
  } catch (error) {
    res.status(400).json({
      ok: false,
      error,
    });
  }
};

module.exports = {
  usuarioGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
};
