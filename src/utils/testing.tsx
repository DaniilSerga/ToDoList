import {RenderOptions, render} from '@testing-library/react';
import {PropsWithChildren} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {AppStore, RootState, setupStore} from 'store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
	preloadedState?: Partial<RootState>;
	store?: AppStore;
}

export function renderWithProviders(
	ui: React.ReactElement,
	extendedRenderOptions: ExtendedRenderOptions = {},
) {
	const {
		preloadedState = {},
		store = setupStore(preloadedState),
		...renderOptions
	} = extendedRenderOptions;

	const Wrapper = ({children}: PropsWithChildren) => (
		<BrowserRouter>
			<Provider store={store}>{children}</Provider>
		</BrowserRouter>
	);

	return {
		store,
		...render(ui, {wrapper: Wrapper, ...renderOptions}),
	};
}
