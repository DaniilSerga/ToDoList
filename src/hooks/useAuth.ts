import {STORAGE_KEYS} from 'constants/storageKeys';
import {useAppSelector} from './reduxHooks';
import {useEffect, useState} from 'react';

export const useAuth = () => {
	const [isAuth, setAuth] = useState(false);
	const {email, token, id} = useAppSelector((state) => state.user);

	useEffect(() => {
		setAuth(!!localStorage.getItem(STORAGE_KEYS.TOKEN));
	}, [email, token, id]);

	// console.log(isAuth);

	return {
		isAuth,
		email,
		token,
		id,
	};
};
