import React, {FC, useState} from 'react';
import {Link} from 'react-router-dom';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {toast} from 'react-toastify';

const RegisterPage: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const auth = getAuth();

	const authorize = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(({user}) => {
				console.log(user);
			})
			.catch(error => {
				toast.error(error.message);
			});
	};

	return (
		<div>
			<input
				type="email"
				name="emailField"
				id="emailField"
				value={email}
				placeholder="Email"
				onChange={e => setEmail(e.target.value)}
			/>
			<input
				type="password"
				name="passwordField"
				id="passwordField"
				value={password}
				placeholder="Password"
				onChange={e => setPassword(e.target.value)}
			/>
			<button onClick={() => authorize()}>Create an account</button>
			<p>
				Already have an account?
				<Link to="/login">Sign in</Link>
			</p>
		</div>
	);
};

export default RegisterPage;
