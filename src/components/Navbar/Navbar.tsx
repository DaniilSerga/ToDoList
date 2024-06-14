import React, {FC, useState} from 'react';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

import styles from './Navbar.module.scss';

const Navbar: FC = () => {
	const [isLightThemeActive, setLightThemeActive] = useState(true);

	return (
		<div className={styles.navbarContainer}>
			<div className={styles.content}>
				<h2>Projects</h2>
			</div>
			<div className={styles.themeTogglerContainer}>
				<div className={styles.themeToggler}>
					<label
						htmlFor="lightTheme"
						className={styles.lightThemeButton}>
						<LightModeOutlinedIcon fontSize="small" />
						<input
							readOnly
							id="lightTheme"
							name="themeGroup"
							checked={isLightThemeActive}
							onClick={() => setLightThemeActive(true)}
							type="radio"></input>
						<span>Light</span>
					</label>
					<label
						htmlFor="darkTheme"
						className={styles.darkThemeButton}>
						<DarkModeOutlinedIcon fontSize="small" />
						<input
							id="darkTheme"
							name="themeGroup"
							checked={!isLightThemeActive}
							onClick={() => setLightThemeActive(false)}
							type="radio"></input>
						<span>Dark</span>
					</label>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
