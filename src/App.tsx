import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {LoginPage, MainPage, RegisterPage} from 'pages';

import './App.scss';
import {useAuth} from 'hooks/useAuth';

const App = () => {
	const navigate = useNavigate();
	const {isAuth} = useAuth();

	useEffect(() => {
		navigate(isAuth ? '/' : 'sign-in');
	}, [isAuth]);

	return (
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route index path="/sign-in" element={<LoginPage />} />
			<Route path="/sign-up" element={<RegisterPage />} />
		</Routes>
	);
};

export default App;
