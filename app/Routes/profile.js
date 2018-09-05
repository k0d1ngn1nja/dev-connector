const express = require("express");
const router = express.Router();
const passport = require("passport");
const profileCntrl = require("../Controllers/profile");
const { protectRoute } = require("../Config/middlewares");

router.get("/", passport.authenticate("jwt", {session: false}), profileCntrl.profile);

module.exports = router;