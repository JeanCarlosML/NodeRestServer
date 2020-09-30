const mongoose = require("mongoose");

const entorno = process.env.NODE_ENV || "dev";
let urlDB = "";
if (entorno == "dev") {
  urlDB = "mongodb://localhost:27017/cafe";
} else {
  urlDB =
    "mongodb://jeanxxjean:rTsvOnr1JUJiEqcf@cluster0.byux7.mongodb.net/<cafe>?retryWrites=true&w=majority";
}

const conectarBD = async () => {
  await mongoose.connect(urlDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};

module.exports = { conectarBD };
