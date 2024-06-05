import {act, fireEvent, waitFor} from '@testing-library/react';
import LoginPage from './LoginPage';
import {renderWithProviders} from 'utils/testing';

beforeAll(async () => {
	global.TextEncoder = require('util').TextEncoder;
	global.TextDecoder = require('util').TextDecoder;
});

describe('LoginPage tests', () => {
	test('page is rendered', () => {
		const {getByText} = renderWithProviders(<LoginPage />);
		const title = getByText(/Sign in/i);
		expect(title).toBeInTheDocument();
	});

	test('errors are being displayed', async () => {
		const {getByText, getByRole} = renderWithProviders(<LoginPage />);

		act(async () => {
			const submitButton = getByRole('button', {name: 'Login'});

			fireEvent.click(submitButton);

			await waitFor(() => {
				expect(
					getByText(/Password field must be filled/i),
				).toBeInTheDocument();

				expect(
					getByText(/'Email field is required'/i),
				).toBeInTheDocument();
			});
		});
	});
});

export {};
