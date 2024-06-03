import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {LoginPage, MainPage, RegisterPage} from 'pages';

import './App.scss';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
		</Routes>
	);
};

export default App;
