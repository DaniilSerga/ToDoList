import {useAppDispatch} from 'hooks/reduxHooks';
import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {UserActions} from 'store/slices/UserSlice';
import AdbIcon from '@mui/icons-material/Adb';
import {Navbar} from 'components';

import styles from './MainPage.module.scss';
import {Sidebar} from 'components/Sidebar';

const MainPage: FC = () => {
	return (
		<div className={styles.container}>
			<Sidebar />

			<Navbar />

			<div>
				<h1>main</h1>
			</div>
		</div>
	);
};

export default MainPage;
