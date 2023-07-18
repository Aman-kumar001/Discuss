const Post = require('../model/Post');
const Comment = require('../model/comment');
const { mergeCommentsWithPosts } = require('../helper/mergeComment');

exports.getAllPost = (req, res) => {
	var data = {};
	Post.find({})
		.then((posts) => {
			data.posts = posts;
			return Comment.find({}).exec(); // Use exec() to return a promise
		})
		.then((comments) => {
			data.comments = comments;
			const mergedData = mergeCommentsWithPosts(data.posts, data.comments);
			res.json(mergedData);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Internal Error', error: err.message });
		});
};

exports.createPost = (req, res) => {
	Post.create(req.body)
		.then((data) => res.json({ message: 'Post added successfully', data }))
		.catch((err) =>
			res
				.status(400)
				.json({ message: 'Failed to create an Post', error: err.message })
		);
};
