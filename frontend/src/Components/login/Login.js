import { Button, TextField } from '@mui/material';
import styles from './login.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = ({ token, setToken }) => {
	const [newUser, setnewUser] = useState(false);
	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
	const [allUsers, setAllUsers] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetch('https://discuss-app.adaptable.app/users/getAllNames')
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setAllUsers(data);
			});
	}, []);

	const loginUser = async () => {
		await fetch('https://discuss-app.adaptable.app/users/logInUser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: user,
				password: password,
			}),
		})
			.then((res) => {
				console.log(res);
				if (res.status == 200) {
					console.log('loged in');
					res.json().then((data) => {
						if (data.data.length > 0) {
							console.log(data);
							setToken({
								id: data.data[0]._id,
								name: data.data[0].name,
							});
							localStorage.setItem(
								'token',
								JSON.stringify({
									id: data.data[0]._id,
									name: data.data[0].name,
								})
							);
							navigate('/dashboard');
						} else {
							alert('Wrong username or password');
						}
					});
				} else {
					setError(true);
					setTimeout(() => {
						setError(false);
					}, 2000);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const registerUser = async () => {
		await fetch('https://discuss-app.adaptable.app/users/createUser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: user,
				password: password,
			}),
		}).then((res) => {
			if (res.status == 200) {
				res.json().then((data) => {
					setToken({
						id: data._id,
						name: data.name,
					});
					localStorage.setItem(
						'token',
						JSON.stringify({
							id: data.data[0]._id,
							name: data.data[0].name,
						})
					);
					navigate('/dashboard');
				});
			} else {
				setError(true);
				setTimeout(() => {
					setError(false);
				}, 2000);
			}
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.login}>
				<div className={styles.avtar}>
					<svg
						width='338'
						height='341'
						viewBox='0 0 338 341'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<g id='login-bear'>
							<path
								id='Vector'
								d='M120.455 56.0562C120.455 56.0562 91.5548 16.9462 38.2248 0.436188C36.7809 -0.0131035 35.2516 -0.117101 33.7601 0.132538C32.2686 0.382178 30.8566 0.978477 29.6376 1.87347C28.4187 2.76847 27.4269 3.93714 26.7421 5.28543C26.0572 6.63372 25.6986 8.12397 25.6948 9.6362C25.8548 61.1362 39.3348 103.366 53.4248 117.736C91.1848 89.6362 120.455 56.0562 120.455 56.0562Z'
								fill='#738DE0'
							/>
							<path
								id='Vector_2'
								d='M105.525 61.6362C105.525 61.6362 86.5748 35.9962 51.6248 25.1762C50.6803 24.8807 49.6797 24.8107 48.7033 24.972C47.727 25.1332 46.802 25.5211 46.0027 26.1046C45.2033 26.688 44.5519 27.4507 44.1008 28.3315C43.6496 29.2123 43.4112 30.1866 43.4048 31.1762C43.5148 64.9362 52.3448 92.6262 61.5848 102.046C77.4695 89.9878 92.1814 76.4579 105.525 61.6362Z'
								fill='#99ADF9'
								stroke='#738DE0'
								stroke-miterlimit='10'
							/>
							<path
								id='Vector_3'
								d='M200.405 56.0562C200.405 56.0562 229.305 16.9462 282.635 0.436188C284.079 -0.0131035 285.608 -0.117101 287.099 0.132538C288.591 0.382178 290.003 0.978477 291.222 1.87347C292.441 2.76847 293.433 3.93714 294.118 5.28543C294.802 6.63372 295.161 8.12397 295.165 9.6362C295.005 61.1362 281.525 103.366 267.435 117.736C229.625 89.6362 200.405 56.0562 200.405 56.0562Z'
								fill='#738DE0'
							/>
							<path
								id='Vector_4'
								d='M215.285 61.6362C215.285 61.6362 234.285 35.9962 269.185 25.1762C270.129 24.8807 271.13 24.8107 272.106 24.972C273.082 25.1332 274.007 25.5211 274.807 26.1046C275.606 26.688 276.258 27.4507 276.709 28.3315C277.16 29.2123 277.398 30.1866 277.405 31.1762C277.295 64.9362 268.465 92.6262 259.225 102.046C243.34 89.9878 228.628 76.4579 215.285 61.6362Z'
								fill='#99ADF9'
								stroke='#738DE0'
								stroke-miterlimit='10'
							/>
							<path
								id='Vector_5'
								d='M160.405 271.976C243.235 271.976 304.995 227.196 306.745 209.346C308.495 191.496 288.605 119.496 268.695 87.8862C248.785 56.2762 217.185 41.3462 160.405 41.3462C103.625 41.3462 72.0147 56.2762 52.1147 87.8862C32.2148 119.496 12.3047 191.496 14.1147 209.346C15.9247 227.196 77.5748 271.976 160.405 271.976Z'
								fill='#738DE0'
							/>
							<path
								id='Vector_6'
								d='M283.335 204.226C280.475 184.026 244.695 105.006 219.675 102.146C194.655 99.2862 169.185 174.226 160.405 226.906C151.625 174.226 126.165 99.2962 101.135 102.126C76.1048 104.956 40.3348 184.006 37.4748 204.206C34.6148 224.406 48.8848 241.296 61.4748 249.656C92.3845 264.339 126.175 271.956 160.395 271.956C194.614 271.956 228.405 264.339 259.315 249.656C271.925 241.316 286.185 224.416 283.335 204.226Z'
								fill='#C7DCF9'
							/>
							<path
								id='Vector_7'
								d='M213.855 240.966C211.135 212.096 179.855 179.906 160.405 179.906C140.955 179.906 109.675 212.126 106.955 240.966C104.235 269.806 127.005 275.346 160.405 275.346C193.805 275.346 216.565 269.836 213.855 240.966Z'
								fill='#738DE0'
							/>
							<path
								id='leftEye'
								d='M110.905 186.856C116.604 186.856 121.225 182.236 121.225 176.536C121.225 170.837 116.604 166.216 110.905 166.216C105.205 166.216 100.585 170.837 100.585 176.536C100.585 182.236 105.205 186.856 110.905 186.856Z'
								fill='#1C3177'
							/>
							<path
								id='left-eyebrow'
								d='M120.175 143.246C124.175 140.846 122.595 131.436 116.485 129.816C110.375 128.196 93.8448 130.446 91.8148 135.036C89.7848 139.626 92.4347 143.036 97.4047 144.366C102.375 145.696 116.485 145.486 120.175 143.246Z'
								fill='#738DE0'
							/>
							<path
								id='rightEye'
								d='M209.905 186.856C215.604 186.856 220.225 182.236 220.225 176.536C220.225 170.837 215.604 166.216 209.905 166.216C204.205 166.216 199.585 170.837 199.585 176.536C199.585 182.236 204.205 186.856 209.905 186.856Z'
								fill='#1C3177'
							/>
							<path
								id='right-eyebrow'
								d='M200.635 143.246C196.635 140.846 198.215 131.436 204.325 129.816C210.435 128.196 226.965 130.446 228.995 135.036C231.025 139.626 228.375 143.036 223.405 144.366C218.435 145.696 204.325 145.486 200.635 143.246Z'
								fill='#738DE0'
							/>
							<path
								id='Vector_8'
								d='M178.455 213.546C178.455 218.616 170.375 228.956 160.455 228.956C150.535 228.956 142.455 218.616 142.455 213.546C142.455 208.476 150.535 204.366 160.455 204.366C170.375 204.366 178.455 208.476 178.455 213.546Z'
								fill='#1C3177'
							/>
							<path
								id='Vector_9'
								opacity='0.45'
								d='M160.405 224.256C160.405 224.256 160.405 236.136 146.405 239.896'
								stroke='#1C3177'
								stroke-width='6'
								stroke-miterlimit='10'
								stroke-linecap='round'
							/>
							<path
								id='Vector_10'
								opacity='0.45'
								d='M160.405 224.256C160.405 224.256 160.405 236.136 174.405 239.896'
								stroke='#1C3177'
								stroke-width='6'
								stroke-miterlimit='10'
								stroke-linecap='round'
							/>
							<path
								id='hand-right'
								className={
									password != '' ? styles.handRight : styles.handHiddenRight
								}
								d='M273.755 326.523C273.579 326.446 273.348 326.343 273.067 326.215C272.36 325.895 271.336 325.422 270.068 324.812C267.533 323.59 264.031 321.82 260.166 319.625C252.41 315.221 243.295 309.165 237.555 302.465C225.952 288.921 209.5 258.853 198.251 225.424C192.612 208.664 189.336 195.865 189.729 186.135C189.925 181.298 191.028 177.267 193.164 173.898C195.3 170.531 198.514 167.753 203.052 165.491C212.35 160.858 220.449 158.387 228.406 161.478C236.414 164.588 244.593 173.449 253.646 192.415C262.71 211.403 269.587 225.109 279.283 235.925C288.91 246.664 301.26 254.498 321.117 261.948C321.933 283.291 310.211 299.397 298.087 310.258C291.97 315.737 285.78 319.854 281.117 322.6C278.787 323.973 276.841 325.001 275.481 325.685C274.801 326.028 274.267 326.283 273.906 326.453C273.851 326.478 273.801 326.502 273.755 326.523Z'
								fill='#738DE0'
								stroke='black'
								stroke-width='2'
							/>
							<path
								id='hand-left'
								className={
									password != '' ? styles.handLeft : styles.handHiddenLeft
								}
								d='M69.2083 332.261C69.3744 332.154 69.5959 332.011 69.8674 331.834C70.5262 331.403 71.4796 330.77 72.6537 329.961C75.0024 328.344 78.2313 326.028 81.7497 323.237C88.8116 317.634 96.9436 310.189 101.525 302.674C110.787 287.482 121.9 255.289 127.099 220.662C129.706 203.299 130.648 190.218 128.437 180.753C127.337 176.049 125.467 172.281 122.664 169.329C119.861 166.376 116.068 164.179 111.024 162.711C100.706 159.707 91.9912 158.621 84.4639 162.979C76.9056 167.354 70.2507 177.389 64.5882 197.472C58.917 217.586 54.4819 232.166 46.6419 244.379C38.859 256.503 27.7707 266.226 8.99115 276.813C12.1463 297.845 27.0515 311.689 41.404 320.332C48.6454 324.693 55.707 327.704 60.9604 329.625C63.5858 330.585 65.7563 331.271 67.2675 331.717C68.0229 331.94 68.6134 332.103 69.0132 332.209C69.0843 332.228 69.1494 332.245 69.2083 332.261Z'
								fill='#738DE0'
								stroke='black'
								stroke-width='2'
							/>
						</g>
					</svg>
				</div>
				<form action='' className={styles.form}>
					<div>
						<TextField
							id='standard-required-input'
							error={error}
							label='Username'
							onChange={(e) => setUser(e.target.value)}
							helperText={error && user == '' ? 'Username is required' : ''}
						/>
					</div>
					<div>
						<TextField
							id='standard-password-input'
							error={error}
							label='Password'
							type='password'
							autoComplete='current-password'
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							helperText={error && password == '' ? 'Password is required' : ''}
						/>
					</div>
					<div className={styles.btnPack}>
						<Button
							variant='contained'
							style={{ color: 'white', backgroundColor: '#1d9bf0' }}
							onClick={(e) => {
								if (user != '' && password != '' && !newUser) {
									loginUser();
								} else if (user != '' && password != '') {
									var temp = allUsers.filter((item) => item.name == user);
									if (temp.length == 0) {
										registerUser();
									} else {
										setError(true);
										alert('Username already exists');
										setTimeout(() => {
											setError(false);
										}, 2000);
									}
								} else {
									setError(true);
									setTimeout(() => {
										setError(false);
									}, 2000);
								}
							}}
						>
							{newUser ? 'Register' : 'Login'}
						</Button>

						{/* for 'OR' seperator */}
						<div className={styles.btnSeperate}>
							<div>
								<div></div>
							</div>
							<div>OR</div>
							<div>
								<div></div>
							</div>
						</div>

						<Button
							variant='outlined'
							onClick={(e) => {
								e.preventDefault();
								setnewUser(!newUser);
							}}
						>
							{!newUser ? 'New ?' : 'Back'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
