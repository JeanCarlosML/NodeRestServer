const Categria = require("../models/categoria.model");
const _ = require("underscore");

//router.get("/categoria", categoriaGet);
const categoriaGet = async (req, res) => {
  try {
    let skip = Number(req.query.skip) || 0;
    let limit = Number(req.query.limit) || 10;
    let categorias = await Categria.find({}).skip(skip).limit(limit).exec();
    let count = await Categria.countDocuments({});
    return res.status(200).json({
      ok: true,
      conteo: count,
      categorias,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }
};

//router.get("/categoria/:id", categoriaGetOne);
const categoriaGetOne = async (req, res) => {
  try {
    let { id } = req.params;
    let categoria = await Categria.findById(id);
    if (!categoria) {
      return res.status(400).json({
        ok: false,
        message: "Categoria no encontrada",
      });
    }
    return res.status(200).json({
      ok: true,
      categoria,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }
};

//router.post("/categoria", [verificarToken], categoriaPost);
const categoriaPost = async (req, res) => {
  try {
    let { descripcion } = req.body;
    let usuario = req.usuario._id;
    let categoria = new Categria({
      descripcion,
      usuario,
    });
    let categoriaDB = await categoria.save().catch((error) => {
      return res.status(400).json({
        ok: false,
        error,
      });
    });
    return res.status(200).json({
      ok: true,
      categoria: categoriaDB,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }
};

//router.put("/categoria/:id", [verificarToken], categoriaUpdate);
const categoriaUpdate = async (req, res) => {
  try {
    let { id } = req.params;
    let { descripcion } = req.body;
    let categoriaDB = await Categria.findByIdAndUpdate(
      id,
      { descripcion },
      {
        runValidators: true,
        context: "query",
        new: true,
      }
    ).catch((error) => {
      return res.status(400).json({
        ok: false,
        error,
      });
    });
    return res.status(200).json({
      ok: true,
      categoria: categoriaDB,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }
};

//router.delete("/categoria/:id", [verificarToken], categoriaDelete);
const categoriaDelete = async (req, res) => {
  try {
    let { id } = req.params;
    let categoriaDB = await Categria.findByIdAndRemove(id);
    console.log(categoriaDB);
    if (!categoriaDB) {
      return res.status(400).json({
        ok: false,
        message: "No se encuentra categoria",
      });
    }
    return res.status(200).json({
      ok: true,
      categoria: categoriaDB,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }
};

module.exports = {
  categoriaPost,
  categoriaGetOne,
  categoriaGet,
  categoriaUpdate,
  categoriaDelete,
};
