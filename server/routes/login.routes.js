const express = require("express");
const router = express.Router();
const {
  loginPost,
  loginPostGoogle,
} = require("../controllers/login.controller");

router.post("/login", loginPost);
router.post("/google", loginPostGoogle);

module.exports = router;
