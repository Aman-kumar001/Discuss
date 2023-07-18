import { useNavigate } from 'react-router-dom';
import styles from './lost.module.css';
import lost from './lost.jpg';
import { Button } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
const Lost = () => {
	const navigate = useNavigate();
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.btnCont}>
					<span>Lost?</span>
					<Button
						variant='contained'
						onClick={() => {
							navigate('/');
						}}
					>
						Home <ReplyIcon />
					</Button>
				</div>

				<img src={lost} alt='lost' />
			</div>
		</div>
	);
};

export default Lost;
