import styles from './popup.module.css';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
const Popup = ({ component: component, setPopup }) => {
	return (
		<div className={styles.container}>
			<CloseOutlinedIcon
				onClick={() => setPopup(null)}
				className={styles.close}
			/>
			<div className={styles.popupWrapper}>{component}</div>
		</div>
	);
};

export default Popup;
