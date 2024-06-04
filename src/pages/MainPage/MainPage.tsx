import {useAppDispatch} from 'hooks/reduxHooks';
import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {UserActions} from 'store/slices/UserSlice';

const MainPage: FC = () => {
	const dispatch = useAppDispatch();

	const logout = () => {
		dispatch(UserActions.removeUser());
	};

	return (
		<div>
			<h1>main</h1>
			<button onClick={logout}>Выйти</button>
		</div>
	);
};

export default MainPage;
