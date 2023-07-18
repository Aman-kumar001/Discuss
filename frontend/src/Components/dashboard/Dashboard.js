import { Avatar, Menu, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import styles from './dashboard.module.css';
import Navbar from '../Navbar/Navbar';
import Post from '../Posts/Post';
import Features from '../features/features';
import useWindowDimensions from '../../Utils/screenDimension';
import Popup from '../../Utils/Popup';

const Dashboard = ({ token }) => {
	const [postContent, setPostContent] = useState('');
	const { height, width } = useWindowDimensions();
	const [popup, setPopup] = useState();
	const [posts, setPosts] = useState([
		{
			author: 'Aman',

			content:
				'laurem  ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lore mauris et justo',
			comments: [
				{
					author: 'aman',
					content: 'this is the first comment',
					level: 1,
					comments: [
						{
							author: 'aman',
							content: 'this is the first reply',
							level: 2,
							comments: [
								{
									author: 'aman',
									content: 'this is the first reply',
									level: 2,
									comments: [
										{
											author: 'aman',
											content: 'this is the first reply',
											level: 2,
										},
									],
								},
							],
						},
						{
							author: 'aman',
							content: 'this is the first reply',
							level: 2,
							comments: [
								{
									author: 'aman',
									content: 'this is the first reply',
									level: 2,
								},
							],
						},
					],
				},
				{
					author: 'aman',
					content: 'this is the second comment',
					level: 1,
					Comments: [
						{
							author: 'aman',
							content: 'this is the first reply',
							level: 2,
						},
					],
				},
			],
		},
		{
			author: 'Aman',
			content: 'ths is the second post',
		},
	]);

	const existingFeatures = [
		'User Authentication',
		'Hierarchical Commenting',
		'User friendly UI',
		'No data lost even on refresh',
	];
	const upcomingFeatures = [
		'Image Upload',
		'User inclined content',
		'Like a post',
	];

	const getAllPosts = () => {
		fetch('https://discuss-app.adaptable.app/post/getAllPosts')
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setPosts(data);
			});
	};

	useEffect(() => {
		getAllPosts();
	}, []);

	const postData = async () => {
		// post data here
		await fetch('https://discuss-app.adaptable.app/post/createPost', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				content: postContent,
				author: token.name,
				type: 'post',
				timeStamp: Date.now(),
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});

		getAllPosts();
	};

	const currPopup = (component) => {
		setPopup(<Popup component={component} setPopup={setPopup} />);
		// console.log(temp);
	};

	return (
		<div className={styles.container}>
			<Navbar />
			{width <= 768 && popup}
			<div className={styles.view}>
				{width > 768 && (
					<div className={styles.LeftPanel}>
						<Features
							upcomingFeatures={upcomingFeatures}
							existingFeatures={existingFeatures}
						/>
					</div>
				)}
				<div className={styles.contentSpace}>
					{width <= 768 && (
						<div className={styles.mobileViewOptions}>
							<span
								onClick={() => {
									currPopup(
										<Features
											upcomingFeatures={upcomingFeatures}
											existingFeatures={existingFeatures}
										/>
									);
								}}
							>
								Features
							</span>
							<span
								onClick={() =>
									currPopup(
										<div className={styles.user}>
											<div className={styles.AvatarCont}>
												<PersonOutlineOutlinedIcon className={styles.avatar} />
											</div>
											<div className={styles.userDetails}>
												<h2>{token.name}</h2>
											</div>
										</div>
									)
								}
							>
								User
							</span>
						</div>
					)}
					<form action='' className={styles.postForm}>
						<TextField
							onChange={(e) => {
								setPostContent(e.target.value);
							}}
						/>
						<div className={styles.formBtnCont}>
							<Button variant='contained' onClick={() => postData()}>
								Post
							</Button>
						</div>
					</form>
					{posts && posts.length > 0 && (
						<Post posts={posts} setPosts={setPosts} token={token} />
					)}
				</div>
				{width > 768 && (
					<div className={styles.user}>
						<div className={styles.AvatarCont}>
							<PersonOutlineOutlinedIcon className={styles.avatar} />
						</div>
						<div className={styles.userDetails}>
							<h2>{token.name}</h2>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
