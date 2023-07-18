const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	content: {
		type: 'String',
		required: true,
	},
	author: {
		type: 'String',
		required: true,
	},
	type: {
		type: 'String',
		required: true,
	},
	timeStamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);
