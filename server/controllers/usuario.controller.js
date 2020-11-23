const Usuario = require("../models/usuario.model");
const bcrypt = require("bcrypt");
const _ = require("underscore");
//router.get("/usuario", [verificarToken], usuarioGet);
const usuarioGet = async (req, res) => {
  try {
    let skip = Number(req.query.skip) || 0;
    let limit = Number(req.query.limit) || 10;
    let usuarios = await Usuario.find({}, "nombre email role estado")
      .skip(skip)
      .limit(limit)
      .exec();
    let count = await Usuario.countDocuments({});
    return res.status(200).json({
      ok: true,
      conteo: count,
      usuarios,
    });
  } catch (error) {
    return res.status(500).json({
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
    return res.json({
      ok: true,
      usuario: usuarioDB,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error,
    });
  }
};

//router.put("/usuario/:id", [verificarToken, verificarRoll], usuarioPut);
const usuarioPut = async (req, res) => {
  try {
    let { id } = req.params;
    console.log(req.file);
    let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);
    let usuarioDB = await Usuario.findByIdAndUpdate(id, body, {
      runValidators: true,
      new: true,
      context: "query",
    });
    return res.json({
      ok: true, 
      usuario: usuarioDB,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error,
    });
  }
};

//router.delete("/usuario/:id", [verificarToken, verificarRoll], usuarioDelete);
const usuarioDelete = async (req, res) => {
  try {
    let { id } = req.params;
    const cambiarEstado = {
      estado: false,
    };
    let usuarioDB = await Usuario.findByIdAndUpdate(id, cambiarEstado, {
      new: true,
    });
    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    } else {
      return res.json({
        ok: true,
        usuario: usuarioDB,
      });
    }
  } catch (error) {
    return res.status(500).json({
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
