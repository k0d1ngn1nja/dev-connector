const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: "User"},
	handle: {type: String, required: true, max: 40},
	company: String,
	website: String,
	location: String,
	status: {type: String, required: true},
	skills: {type: [String], required: true},
	bio: String,
	githubid: String,
	experience: [
		{
			title: {type: String, required: true},
			company: {type: String, required: true},
			location: String,
			startDate: {type: Date, required: true},
			endDate: Date,
			current: {type: Boolean, default: false},
			description: String
		},
	],
	education: [
		{
			school: {type: String, required: true},
			degree: {type: String, required: true},
			fieldofstudy: {type: String, required: true},
			startDate: {type: Date, required: true},
			endDate: Date,
			current: {type: Boolean, default: false},
			description: String
		},
	],
	social:{
		youtube: {type: String},
		facebook: {type: String},
		twitter: {type: String},
		instagram: {type: String},
		linkedin: {type: String},
	}
}, {timestamps: true});

module.exports = Profile = mongoose.model("Profile", ProfileSchema);