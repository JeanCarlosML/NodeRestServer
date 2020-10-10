const express = require("express");
const { loginPost } = require("../controllers/login.controller");
const router = express.Router();

router.get("/login");

router.post("/login", loginPost);

router.put("/login/:id");

router.delete("/login/:id");

module.exports = router;
