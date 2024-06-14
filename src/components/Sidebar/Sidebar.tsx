import React, {FC} from 'react';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import styles from './Sidebar.module.scss';
import {UserActions} from 'store/slices/UserSlice';
import {useAppDispatch} from 'hooks/reduxHooks';

const Sidebar: FC = () => {
	const dispatch = useAppDispatch();

	const logout = () => {
		dispatch(UserActions.removeUser());
	};

	return (
		<div className={styles.container}>
			<button onClick={logout} className={styles.logoutButton}>
				<LogoutOutlinedIcon fontSize="medium" />
			</button>
		</div>
	);
};

export default Sidebar;
