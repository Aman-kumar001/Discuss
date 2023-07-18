import { Avatar, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Comment from '../Comments/Comment';
import styles from './post.module.css';
const Post = ({ posts, setPosts, token }) => {
	const [comments, setComments] = useState([]);
	const [giveComment, setGiveComment] = useState(null);
	const [postContent, setPostContent] = useState('');
	useEffect(() => {
		var temp = [];
		posts.forEach((post) => {
			temp.push(false);
		});
		setComments(temp);
	}, []);

	const getAllPosts = () => {
		fetch('https://discuss-app.adaptable.app/post/getAllPosts')
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setPosts(data);
			});
	};

	const postReply = async (level, parent) => {
		console.log(token);
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
			setGiveComment(null);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.container}>
			{posts.map((post, index) => {
				return (
					<div className={styles.post} key={index}>
						<div className={styles.postAuthor}>
							<Avatar className={styles.authorAvatar} /> {post.author}
						</div>
						<div className={styles.postContent}>{post.content}</div>
						<div className={styles.postComment}>
							{
								<ForumOutlinedIcon
									style={{
										color: `${comments[index] ? '#2a475e' : 'grey'}`,
									}}
									onClick={() => {
										setComments((prev) => {
											var temp = [...prev];
											temp[index] = !temp[index];
											return temp;
										});
									}}
								/>
							}

							{giveComment != index && (
								<AddCommentOutlinedIcon onClick={() => setGiveComment(index)} />
							)}
							{giveComment == index && (
								<CloseOutlinedIcon
									style={{ color: 'red' }}
									onClick={() => {
										setGiveComment(null);
									}}
								/>
							)}
						</div>

						{giveComment === index && (
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
											postReply(0, post._id);
										}}
									>
										Reply
									</Button>
								</div>
							</form>
						)}

						{comments[index] && post.comments && post?.comments.length > 0 && (
							<Comment
								comment={post?.comments}
								setPosts={setPosts}
								token={token}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default Post;
