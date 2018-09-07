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

router.post("/experience", passport.authenticate("jwt", {session: false}), profileCntrl.addExperience);

router.post("/education", passport.authenticate("jwt", {session: false}), profileCntrl.addEducation);

router.delete("/experience/:exp_id", passport.authenticate("jwt", {session: false}), profileCntrl.deleteExperience);

router.delete("/education/:edu_id", passport.authenticate("jwt", {session: false}), profileCntrl.deleteEducation);

router.delete("/", passport.authenticate("jwt", {session: false}), profileCntrl.deleteUserProfile);

module.exports = router;