import { Avatar, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './comment.module.css';

const Comment = ({ comment, setPosts, token }) => {
	const [showReply, setShowReply] = useState([]);
	const [giveReply, setGiveReply] = useState(null);
	const [postContent, setPostContent] = useState('');

	useEffect(() => {
		const temp = Array(comment.length).fill(false);
		setShowReply(temp);
	}, [comment]);

	const getAllPosts = () => {
		fetch('https://discuss-app.adaptable.app/post/getAllPosts')
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setPosts(data);
			});
	};

	const postReply = async (level, parent) => {
		try {
			await fetch('https://discuss-app.adaptable.app/comment/createComment', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					content: postContent,
					author: token.name,
					type: 'comment',
					timeStamp: Date.now(),
					level: level + 1,
					parent_id: parent,
				}),
			});

			getAllPosts();
			setGiveReply(null);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.commentContainer}>
			{comment.map((comment, index) => (
				<div
					key={index}
					className={styles.Comment}
					style={{ paddingLeft: `${comment.level * 0.3}rem` }}
				>
					<div className={styles.postAuthor}>
						<div>
							<Avatar className={styles.authorAvatar} />
							{comment.author}
						</div>
						<div style={{ display: 'flex', justifyContent: 'right' }}>
							{comment.timeStamp}
						</div>
					</div>
					<div className={styles.commentContent}>{comment.content}</div>
					<div className={styles.postComment}>
						{giveReply !== index && (
							<span
								onClick={() => {
									setGiveReply(index);
								}}
							>
								Reply
							</span>
						)}
						{giveReply === index && (
							<span
								style={{
									color: 'red',
									border: '1px solid red',
									borderRadius: '4px',
									padding: '0.1rem',
									backgroundColor: 'white',
								}}
								onClick={() => {
									setGiveReply(null);
								}}
							>
								Close
							</span>
						)}
						{comment?.comments && comment?.comments.length > 0 && (
							<span
								className={styles.showReply}
								onClick={() => {
									const temp = [...showReply];
									temp[index] = !temp[index];
									setShowReply(temp);
								}}
							>
								{showReply[index] ? 'Hide Reply' : 'Show Reply...'}
							</span>
						)}
					</div>
					{giveReply === index && (
						<form>
							<TextField
								onChange={(e) => {
									setPostContent(e.target.value);
								}}
							/>
							<div
								style={{
									display: 'flex',
									justifyContent: 'right',
									marginTop: '0.3rem',
								}}
								className={styles.replyButtonContainer}
							>
								<Button
									variant='contained'
									onClick={(e) => {
										e.preventDefault();
										postReply(comment.level, comment._id);
									}}
								>
									Reply
								</Button>
							</div>
						</form>
					)}
					{showReply[index] && comment?.comments && (
						<Comment comment={comment?.comments} setPosts={setPosts} token={token}/>
					)}
				</div>
			))}
		</div>
	);
};

export default Comment;
