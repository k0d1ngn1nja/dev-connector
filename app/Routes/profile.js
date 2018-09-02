const express = require("express");
const router = express.Router();
const postCntrl = require("../Controllers/profile");

router.get("/test", (req, res) =>{
	res.json({msg: "Profile route is working!"});
});

module.exports = router;