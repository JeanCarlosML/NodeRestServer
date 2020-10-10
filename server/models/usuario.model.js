const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
let Schema = mongoose.Schema;

const rolesValidos = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} no es un rol valido",
};

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es necesario"],
  },
  email: {
    type: String,
    required: [true, "El correo es necesario"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: "USER_ROLE",
    enum: rolesValidos,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});
//Validacion para datos unicos
usuarioSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });

module.exports = mongoose.model("Usuario", usuarioSchema);
