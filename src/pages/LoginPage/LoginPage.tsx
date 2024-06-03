import React, {FC} from 'react';
import {Link} from 'react-router-dom';

const LoginPage: FC = () => {
	return (
		<div>
			<h1>login</h1>
			<Link to="/register">
				<p>Register</p>
			</Link>
		</div>
	);
};

export default LoginPage;
