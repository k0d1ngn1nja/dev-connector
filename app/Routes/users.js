const express = require("express");
const router = express.Router();
const passport = require("passport");
const authCntrl = require("../Controllers/auth");

router.get("/currentuser", passport.authenticate("jwt", {session: false}), authCntrl.currentUser);

router.post("/login", authCntrl.login);

router.post("/register", authCntrl.register);

module.exports = router;