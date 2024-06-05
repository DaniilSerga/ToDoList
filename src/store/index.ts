import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {UserReducer} from './slices';

const rootReducer = combineReducers({
	user: UserReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
}

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
