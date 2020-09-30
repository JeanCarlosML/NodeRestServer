const Usuario = require("../models/usuario.model");
const bcrypt = require("bcrypt");
const _ = require("underscore");

const usuarioGetBasic = (req, res) => {
  res.json("hola json");
};
const usuarioGet = (req, res) => {
  let desde = Number(req.query.skip) || 0;
  let limite = Number(req.query.limite) || 10;
  Usuario.find({}, "nombre email")
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      Usuario.count({}, (err, count) => {
        return res.json({
          ok: true,
          conteo: count,
          usuarios,
        });
      });
    });
};
const usuarioPost = (req, res) => {
  let body = req.body;
  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
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
const usuarioPut = (req, res) => {
  let id = req.params.id;
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
      return res.json({
        ok: true,
        usuario: usuarioDB,
      });
    }
  );
};
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
  /* Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
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
  }); */
};

module.exports = {
  usuarioGetBasic,
  usuarioGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
};
