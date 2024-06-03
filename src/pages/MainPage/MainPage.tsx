import React, {FC} from 'react';
import {Link} from 'react-router-dom';

const MainPage: FC = () => {
	return (
		<div>
			<h1>main</h1>
			<Link to="/login">login</Link>
		</div>
	);
};

export default MainPage;
