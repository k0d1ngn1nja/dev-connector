const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	text: {
		type:String,
		required: true
	},
	name: {type: String},
	avatar: {type: String},
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "User"
			}
		}
	],
	comments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "User"
			},
			text: {type: String, required: true},
			name: String,
			avatar: String,
			date: {type: Date, default: Date.now}
		}
	]
}, {timestamps: true});

module.exports = Post = mongoose.model("Post", PostSchema);