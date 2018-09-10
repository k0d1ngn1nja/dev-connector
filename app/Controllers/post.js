const Post = require("../Models/Post");
const validate = require("../Utility/validations");

const postCntrl = {
	create: (req, res, next) =>{
		const { errors, isValid } = validate.postIput(req.body);
		
		if(!isValid){
			return res.status(400).json(errors);
		};

		const newpost = new Post({
			text: req.body.text,
			name: req.body.name,
			avatar: req.body.avatar,
			author: req.user.id
		});

		newpost.save().then(post => res.json(post));
	}
};

module.exports = postCntrl;