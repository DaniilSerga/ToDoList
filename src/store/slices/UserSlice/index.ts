import {createSlice} from '@reduxjs/toolkit';
import {IInitialState} from './type';

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
		},
		removeUser(state) {
			state.email = null;
			state.email = null;
			state.email = null;
		},
	},
});

export const UserReducer = userSlice.reducer;

export const UserActions = {...userSlice.actions};
export const UserEffects = {};
