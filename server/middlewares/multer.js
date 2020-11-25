//Multer configuracion
const multer = require("multer");
const path = require("path");
//Guardar datos en disco con ruta especificada
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../../public/img/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});
//Filtrar tipo de archivos
const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
//Asignando configuraciones
const limits = 100000; //bytes
const upload = multer({
  storage,
  fileFilter,
  limits,
}).single("image");
module.exports = upload;
