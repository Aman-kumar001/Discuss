const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	type: {
		type: 'String',
		required: true,
	},
	parent_id: {
		type: 'String',
		required: true,
	},
	content: {
		type: 'String',
		required: true,
	},
	author: {
		type: 'String',
		required: true,
	},
	level: {
		type: 'Number',
		required: true,
	},
	timeStamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', CommentSchema);
