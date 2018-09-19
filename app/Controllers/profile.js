const mongoose = require("mongoose");
const User = require("../Models/User");
const Profile = require("../Models/Profile");
const validate = require("../Utility/validations");

const profileCntrl = {
	show: (req, res, next) =>{
		const errors = {};
		
		Profile.findOne({user: req.user.id}).populate("user", ["name", "avatar"]).then((profile) =>{
			if(!profile){
				errors.noprofile = "There is no profile for this user";
				return res.status(404).json(errors);
			}
			console.log(profile)
			res.json(profile);
		}).catch((err) => res.status(404).json(err));
	},

	create: (req, res, next) =>{
		const {errors, isValid} = validate.profileInput(req.body);

		if(!isValid){
			return res.status(400).json(errors);
		}

		const profileFields = {};
		profileFields.user = req.user.id;

		if(req.body.handle) profileFields.handle = req.body.handle;
		if(req.body.company) profileFields.company = req.body.company;
		if(req.body.webbsite) profileFields.website = req.body.website;
		if(req.body.location) profileFields.location = req.body.location;
		if(req.body.bio) profileFields.bio = req.body.bio;
		if(req.body.status) profileFields.status = req.body.status;
		if(req.body.githubid) profileFields.githubid = req.body.githubid;

		if(typeof req.body.skills !== "undefined"){
			profileFields.skills = req.body.skills.split(",");
		}

		profileFields.social = {};
		if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
		if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
		if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
		if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
		if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

		Profile.findOne({user: req.user.id}).then(profile => {
			if(profile){
				// update profile
				Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true}).then(profile => res.json(profile));
			} else {
				// create profile
				Profile.findOne({handle: profileFields.handle}).then(profile =>{
					if(profile){
						errors.handle = "That handle already exists";
						return res.status(400).json(errors);
					}

					new Profile(profileFields).save().then(profile => res.json(profile));
				})
			}
		})
	},

	profile_by_handle: (req, res, next) =>{
		const errors = {};

		Profile.findOne({handle: req.params.handle}).populate("User", ["name", "avatar"])
			.then((profile) =>{
				if(!profile){
					errors.noprofile = "There is no profile for this user";
					return res.status(404).json(errors);
				}

				console.log("Profile: ", profile);
				res.json(profile);
			}).catch(err => res.status(400).json(err));
	},

	user: (req, res, next) =>{
		const errors = {};
		
		Profile.findOne({user: req.params.user_id}).populate("user", ["name", "avatar"])
			.then(profile =>{
				if(!profile){
					errors.noprofile = "There is no profile for this user";
					res.status(404).json(errors);
				}

				res.json(profile);
			}).catch(err => res.status(400).json(err));
	},

	allProfiles: (req, res, next) =>{
		const errors = {};

		Profile.find().populate("User", ["name", "avatar"]).then(profiles =>{
			if(!profiles){
				errors.noprofiles = "There are currently no profiles.";
				return res.status(404).json(errors);
			}

			return res.json(profiles);
		}).catch(err => res.status(404).json(err));
	},

	addExperience: (req, res, next) =>{
		const {errors, isValid} = validate.experienceInput(req.body);

		if(!isValid){
			return res.status(400).json(errors);
		}

		Profile.findOne({user: req.user.id}).then((profile) =>{
			const newexp = {
				title: req.body.title,
				company: req.body.company,
				location: req.body.location,
				startDate: req.body.startDate,
				endDate: req.body.endDate,
				current: req.body.current,
				description: req.body.description
			};
			
			profile.experience.unshift(newexp);
			profile.save().then(profile => res.json(profile));
		}).catch(err => res.status(404).json(err));
	},

	addEducation: (req, res, next) =>{
		const {errors, isValid} = validate.educationInput(req.body);

		if(!isValid){
			return res.status(400).json(errors);
		}

		Profile.findOne({user: req.user.id}).then((profile) =>{
			const newedu = {
				school: req.body.school,
				degree: req.body.degree,
				fieldofstudy: req.body.fieldofstudy,
				startDate: req.body.startDate,
				endDate: req.body.endDate,
				current: req.body.current,
				description: req.body.description
			};
			
			profile.education.unshift(newedu);
			profile.save().then(profile => res.json(profile));

		}).catch(err => res.status(404).json(err));
	},

	deleteExperience: (req, res, next) =>{
		Profile.findOne({user: req.user.id}).then((profile) =>{
			const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
			profile.experience.splice(removeIndex, 1);

			profile.save().then((profile) => res.json(profile));
		}).catch((err) => res.status(404).json(err));
	},

	deleteEducation: (req, res, next) =>{
		Profile.findOne({user: req.user.id}).then((profile) =>{
			const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
			profile.education.splice(removeIndex, 1);

			profile.save().then((profile) => res.json(profile));
		}).catch((err) => res.status(404).json(err));
	},

	deleteUserProfile: (req, res, next) =>{
		Profile.findOneAndRemove({user: req.user.id}).then(() =>{
			User.findOneAndRemove({_id: req.user.id}).then(() => res.json({success: true}));
		}).catch(err => res.status(404).json(err));
	}
}

module.exports = profileCntrl;