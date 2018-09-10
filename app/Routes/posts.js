const express = require("express");
const router = express.Router();
const passport = require("passport");
const postCntrl = require("../Controllers/post");

router.post("/", passport.authenticate("jwt", {session: false}), postCntrl.create);

module.exports = router;