const express = require("express");
const router = express.Router();
const passport = require("passport");
const postCntrl = require("../Controllers/post");

router.get("/", postCntrl.index);

router.route("/:id")
	.get(postCntrl.show)
	.delete(passport.authenticate("jwt", {session: false}), postCntrl.delete);

router.post("/like/:id", passport.authenticate("jwt", {session: false}), postCntrl.like);

router.post("/unlike/:id", passport.authenticate("jwt", {session: false}), postCntrl.unlike);

router.post("/", passport.authenticate("jwt", {session: false}), postCntrl.create);

router.post("/comment/:id", passport.authenticate("jwt", {session: false}), postCntrl.createComment);

router.delete("/comment/:id/:comment_id", passport.authenticate("jwt", {session: false}), postCntrl.deleteComment);

module.exports = router;