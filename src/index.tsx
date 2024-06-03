import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from 'store';
import {ToastContainer} from 'react-toastify';
import 'services/firebaseConfig';
import 'react-toastify/dist/ReactToastify.css';

import './index.scss';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
				<ToastContainer position="bottom-right" />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
);
