const express = require("express");
const router = express.Router();
const postCntrl = require("../Controllers/post");

router.get("/test", (req, res) =>{
	res.json({msg: "Post route is working!"});
});

module.exports = router;