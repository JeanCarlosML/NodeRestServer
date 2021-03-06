// ============================
//  Vencimiento del Token
// ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
process.env.SEED = process.env.SEED || "este-es-el-seed-desarrollo"; //SEMILLA DE ENCRIPTADO
// ============================

// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";
// ============================

// ============================
//  Entorno
// ============================
let urlDB;
if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/cafe";
} else {
  urlDB = process.env.MONGO_URI;
}

process.env.MONGO_URI = urlDB;
// ============================
// ============================

// ============================
//CLIENT_ID PERSONAL DE GOOGLE
// ============================
process.env.CLIENT_ID =
  process.env.CLIENT_ID ||
  "75191184269-1u9jujf7obhng5b0s9qqokd2p6j0d5vt.apps.googleusercontent.com";
// ============================
