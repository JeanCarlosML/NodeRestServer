const express = require("express");
const {
  loginPost,
  loginPostGoogle,
} = require("../controllers/login.controller");
const router = express.Router();

router.post("/login", loginPost);

router.post("/google", loginPostGoogle);
module.exports = router;
