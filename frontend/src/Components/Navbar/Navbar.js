import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import styles from './navbar.module.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../logo/logo.svg';
const Navbar = () => {
	const navigate = useNavigate();
	const Logout = () => {
		localStorage.removeItem('token');
		navigate('/');
	};
	return (
		<div className={styles.cont}>
			<div>
				<img src={logo} alt='logo' />
			</div>
			<div>
				<LogoutOutlinedIcon
					style={{ color: 'grey' }}
					onClick={() => {
						Logout();
					}}
				/>
			</div>
		</div>
	);
};

export default Navbar;
