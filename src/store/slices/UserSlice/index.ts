import {createSlice} from '@reduxjs/toolkit';
import {IInitialState} from './type';
import {STORAGE_KEYS} from 'constants/storageKeys';

const initialState: IInitialState = {
	email: '',
	token: '',
	id: '',
};

const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		setUser(state, action) {
			state.email = action.payload.email;
			state.token = action.payload.token;
			state.id = action.payload.id;
			localStorage.setItem(STORAGE_KEYS.TOKEN, action.payload.token);
		},
		removeUser(state) {
			state.email = null;
			state.email = null;
			state.email = null;
			localStorage.removeItem(STORAGE_KEYS.TOKEN);
		},
	},
});

export const UserReducer = userSlice.reducer;

export const UserActions = {...userSlice.actions};
export const UserEffects = {};
