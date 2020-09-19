const mongoose = require("mongoose");

const conectarBD = async () => {
  await mongoose.connect("mongodb://localhost:27017/cafe", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { conectarBD };
