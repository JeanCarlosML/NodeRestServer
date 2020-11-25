const express = require("express");
const _ = require("underscore");
const Producto = require("../models/producto.model");

//router.get("/producto", productoGet);
const productoGet = async (req, res) => {
  try {
    let skip = Number(req.query.skip) || 0;
    let limit = Number(req.query.limit) || 10;
    let productos = await Producto.find({})
      .populate("usuario", "nombre email") //Mostrar datos de usuario [selecciono nombre e email en segundo argumento]
      .populate("categoria", "descripcion")
      .skip(skip)
      .limit(limit)
      .exec();
    let count = await Producto.countDocuments({});
    return res.status(200).json({
      ok: true,
      conteo: count,
      productos,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }
};

//router.get("/producto/:id", productoGetOne);
const productoGetOne = async (req, res) => {
  try {
    let { id } = req.params;
    let producto = await Producto.findById(id);
    if (!producto) {
      return res.status(400).json({
        ok: false,
        message: "Producto no encontrada",
      });
    }
    return res.status(200).json({
      ok: true,
      producto,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }
};

//router.post("/producto", [verificarToken], productoPost);
const productoPost = async (req, res) => {
  try {
    let usuario = req.usuario._id;
    let { nombre, precioUni, descripcion, disponible, categoria } = req.body;
    let producto = new Producto({
      usuario,
      nombre,
      precioUni,
      descripcion,
      disponible,
      categoria,
    });
    let productoDB = await producto.save().catch((error) => {
      return res.status(400).json({
        ok: false,
        error,
      });
    });
    return res.status(200).json({
      ok: true,
      producto: productoDB,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }
};

//router.put("/producto/:id", [verificarToken], productoPut);
const productoUpdate = async (req, res) => {
  try {
    let { id } = req.params;
    let body = _.pick(req.body, [
      "nombre",
      "precioUni",
      "descripcion",
      "disponible",
      "categoria",
    ]);
    console.log(body);
    let productoDB = await Producto.findByIdAndUpdate(id, body, {
      runValidators: true,
      context: "query",
      new: true,
    }).catch((error) => {
      return res.status(400).json({
        ok: false,
        error,
      });
    });
    if (!productoDB) {
      return res.status(400).json({
        ok: false,
        message: "Producto no encontrada",
      });
    }
    return res.status(200).json({
      ok: true,
      producto: productoDB,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }
};

//router.delete("/producto/:id", [verificarToken], productoDelete);
const productoDelete = async (req, res) => {
  try {
    let { id } = req.params;
    let productoDB = await Producto.findByIdAndUpdate(id, {
      disponible: false,
    });
    if (!productoDB) {
      return res.status(400).json({
        ok: false,
        message: "No se encuentra producto",
      });
    }
    return res.status(200).json({
      ok: true,
      producto: productoDB,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }
};

//router.get("/producto/buscar/:producto",[verificarToken], buscarProductos);
const buscarProductos = async (req, res) => {
  try {
    let { producto } = req.params;
    let regx = new RegExp(producto, "i");
    let productos = await Producto.find({ nombre: regx })
      .populate("categoria", "nombre")
      .exec();
    let count = await Producto.countDocuments({nombre:regx});
    return res.status(200).json({
      ok: true,
      count,
      productos,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }
};

module.exports = {
  productoGet,
  productoGetOne,
  productoPost,
  productoUpdate,
  productoDelete,
  buscarProductos,
};
