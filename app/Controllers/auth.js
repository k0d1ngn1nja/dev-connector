const User = require("../Models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../Config/keys");

const authCntrl = {
	register: (req, res, next) =>{
		const {email, name, password, avatar} = req.body;

		User.findOne({email: email}).then(user =>{
			if(user) {
				return res.status(400).json({email: "Email already exists."})
			} else {
				const avatar = gravatar.url(email, {s: "200", r: "pg", d: "mm"});
				const _user = new User({email, name, avatar, password});
				
				bcrypt.genSalt(10, (err, salt) =>{
					bcrypt.hash(_user.password, salt, (err, hash) =>{
						if(err) throw err;
						_user.password = hash;
						_user.save().then(user => res.json(user)).catch(err => console.log(err));
					});
				});
			};
		}).catch(err => console.log(err));
	},

	login: (req, res, next) =>{
		const { email, password } = req.body;
		
		User.findOne({email}).then((user) =>{
			if(!user) return res.status(400).json({email: "User not found!"});
			bcrypt.compare(password, user.password).then(isMatch => {
				if(isMatch){
					const payload = {id: user.id, name: user.name, avatar: user.avatar}; //jwt payload
					
					//signed token
					jwt.sign(payload, keys.secret, {expiresIn: 3600}, (err, token) =>{
						res.json({success: true, token: "Bearer " + token});
					});
				} else {
					return res.status(400).json({password: "Password incorrect."});
				}
			});
		}).catch(err => console.log(err));
	},

	currentUser: (req, res, next) =>{
		res.json(req.user);
	}
};

module.exports = authCntrl;