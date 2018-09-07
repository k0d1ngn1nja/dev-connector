const express = require("express");
const router = express.Router();
const passport = require("passport");
const profileCntrl = require("../Controllers/profile");
const { protectRoute } = require("../Config/middlewares");

router.get("/", passport.authenticate("jwt", {session: false}), profileCntrl.show);

router.get("/handle/:handle", profileCntrl.profile_by_handle);

router.get("/users/:user_id", profileCntrl.user);

router.get("/all", profileCntrl.allProfiles);

router.post("/", passport.authenticate("jwt", {session: false}), profileCntrl.create);

module.exports = router;