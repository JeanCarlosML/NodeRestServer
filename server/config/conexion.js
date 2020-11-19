const mongoose = require("mongoose");

const conectarBD = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(`Base de datos conectada correctamente`);
  } catch (error) {
    console.log(`Error al conectar la Base de Datos :`, error);
  }
};
conectarBD();
