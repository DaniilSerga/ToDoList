import {act, fireEvent, waitFor} from '@testing-library/react';
import LoginPage from './LoginPage';
import {renderWithProviders} from 'utils/testing';

beforeAll(async () => {
	global.TextEncoder = require('util').TextEncoder;
	global.TextDecoder = require('util').TextDecoder;
});

describe('Login page tests', () => {
	test('It should render Login page', () => {
		const {getByText} = renderWithProviders(<LoginPage />);
		const title = getByText(/Sign in/i);
		expect(title).toBeInTheDocument();
	});

	test('It should display errors when input are empty', async () => {
		const {getByText} = renderWithProviders(<LoginPage />);
		const submitButton = getByText('Login');

		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(
				getByText('Password field must be filled'),
			).toBeInTheDocument();

			expect(getByText('Email field is required')).toBeInTheDocument();
		});
	});
});

export {};
