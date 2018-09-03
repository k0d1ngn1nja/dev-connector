const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: [true, "Name is required."],
		unique: true,
		index: true,
		minlength: 5
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
}, {timestamps: true}); 


module.exports = User = mongoose.model("User", userSchema);