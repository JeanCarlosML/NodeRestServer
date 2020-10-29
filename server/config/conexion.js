const mongoose = require("mongoose");
mongoose.connect(
  process.env.URLDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.log(`Error al conectar la Base de Datos :`, err);
    } else {
      console.log(`Base de datos conectada correctamente`);
    }
  }
);
