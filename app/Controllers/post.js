const Post = require("../Models/Post");
const Profile = require("../Models/Profile");
const validate = require("../Utility/validations");

const filterLikes = function(post){
	if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
		return res.status(400).json({error: 'User already liked this post.'});
	} else if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
		return res.status(400).json({error: 'You have not yet liked this post.'});
	} else{
		return post;
	}
};

const postCntrl = {
	index: (req, res, next) =>{
		Post.find().sort({date: -1}).then((posts) => res.json(posts)).catch((err) => res.status(404).json(err));
	},

	show: (req, res, next) =>{
		Post.findById(req.params.id).then((post) => res.json(post))
			.catch(err => res.status(404).json({error: "No post found with that Id."}));
	},

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
	},

	delete: (req, res, next) =>{
		Profile.findOne({user: req.user.id}).then(profile =>{
			Post.findById(req.params.id).then(post =>{
				if(post.author.toString() !== req.user.id){
					return res.status(401).json({error: "User not authorized!"});
				}

				post.remove().then(() => res.json({success: true}));
			}).catch(err => res.status(404).json({error: "Post not found!"}));
		}).catch((err) => res.status(404).json(error));
	},

	like: (req, res, next) =>{
		Profile.findOne({user: req.user.id}).then(profile =>{
			Post.findById(req.params.id).then(post =>{
				filterLikes(post);
				post.likes.unshift({user: req.user.id});
				post.save().then(post => res.json(post)).catch(err => res.status(404).json(err));
			}).catch(err => res.status(404).json({error: "Post not found!"}));
		}).catch((err) => res.status(404).json(error));
	},

	unlike: (req, res, next) =>{
		Profile.findOne({user: req.user.id}).then(profile =>{
			Post.findById(req.params.id).then(post =>{
				filterLikes(post);
				const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
				post.likes.splice(removeIndex, 1);

				post.save().then(post => res.json(post)).catch(err => res.status(404).json(err));
			}).catch(err => res.status(404).json({error: "Post not found!"}));
		}).catch((err) => console.log("Error: ", err));
	},

	createComment: (req, res, next) =>{
		const { errors, isValid } = validate.postIput(req.body);
		
		if(!isValid){
			return res.status(400).json(errors);
		};

		Post.findById(req.params.id).then((post) =>{
			const newcomment = {
				text: req.body.text,
				name: req.body.name,
				avatar: req.body.avatar,
				user: req.user.id
			};

			post.comments.unshift(newcomment);
			post.save().then(post => res.json(post)).catch(err => res.status(404).json({error: "No post found."}));
		}).catch(err => res.status(404).json(err));
	},

	deleteComment: (req, res, next) =>{
		Post.findById(req.params.id).then((post) =>{
			if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
				return res.status(404).json({error: "Comment doesn't exist."});
			}
			
			const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);
			post.comments.splice(removeIndex, 1);

			post.save().then(post => res.json(post)).catch(err => res.status(404).json({error: err}));
		}).catch(err => res.status(404).json(err));
	},
};

module.exports = postCntrl;