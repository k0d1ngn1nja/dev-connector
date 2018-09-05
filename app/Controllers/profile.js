const mongoose = require("mongoose");
const User = require("../Models/User");
const Profile = require("../Models/Profile");
const validate = require("../Utility/validations");

const profileCntrl = {
	profile: (req, res, next) =>{
		const errors = {};
		
		Profile.findOne({user: req.user.id}).then((profile) =>{
			if(!profile){
				errors.noprofile = "There is no profile for this user";
				return res.status(404).json(errors);
			}

			re.json(profile);
		}).catch((err) => res.status(404).json(err));
	}
}

module.exports = profileCntrl;