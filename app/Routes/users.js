const express = require("express");
const router = express.Router();
const authCntrl = require("../Controllers/auth");

router.post("/login", authCntrl.login);

router.post("/register", authCntrl.register);

module.exports = router;