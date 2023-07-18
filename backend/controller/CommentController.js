const Comment = require('../model/comment');

//provides all the existing Postnames to check for uniqueness without making multiple calls
exports.createComment = (req, res) => {
	Comment.create(req.body)
		.then((data) => res.json({ message: 'Commet added successfully', data }))
		.catch((err) =>
			res
				.status(400)
				.json({ message: 'Failed to post comment', error: err.message })
		);
};
