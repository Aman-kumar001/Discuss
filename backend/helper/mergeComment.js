function mergeCommentsWithPosts(posts, comments) {
	const mergedData = [];
	// const cmnts = [...comments];
	posts.sort((a, b) => b.timeStamp - a.timeStamp);
	comments.sort((a, b) => b.timeStamp - a.timeStamp);
	posts.forEach((post) => {
		const postWithComments = { ...post._doc, comments: [] };
		const updatedComments = comments.map((comment) => {
			return { ...comment._doc, comments: [] };
		});

		updatedComments.forEach((comment) => {
			var parentComment = updatedComments.find(
				(c) => c._id == comment.parent_id
			);
			if (parentComment) {
				var temp = parentComment;
				temp.comments.push(comment);
				updatedComments.splice(updatedComments.indexOf(parentComment), 1, temp);
			}
		});
		console.log(updatedComments);

		updatedComments.forEach((comment) => {
			if (comment.parent_id == post._id) {
				postWithComments.comments.push(comment);
			}
		});

		mergedData.push(postWithComments);
	});
	return mergedData;
}

module.exports = {
	mergeCommentsWithPosts,
};
