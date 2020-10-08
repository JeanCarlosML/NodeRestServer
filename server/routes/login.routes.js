const express = require("express");
const loginController = require("../controllers/login.controller");
const router = express.Router();

router.get("/");

router.get("/login");

router.post("/login", loginController.loginPost);

router.put("/login/:id");

router.delete("/login/:id");

module.exports = router;
