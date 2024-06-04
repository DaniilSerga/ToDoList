import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {LoginPage, MainPage, RegisterPage} from 'pages';

import './App.scss';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="/signin" element={<LoginPage />} />
			<Route path="/signup" element={<RegisterPage />} />
		</Routes>
	);
};

export default App;
