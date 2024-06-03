import {configureStore} from '@reduxjs/toolkit';
import {UserReducer} from './slices';

const store = configureStore({
	reducer: {
		user: UserReducer,
	},
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
