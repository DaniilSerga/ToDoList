import {renderWithProviders} from 'utils/testing';
import RegisterPage from './RegisterPage';
import {fireEvent, waitFor} from '@testing-library/dom';

describe('Register page tests', () => {
	test('It shoud render the page', () => {
		const {getByText} = renderWithProviders(<RegisterPage />);
		expect(getByText('Sign Up')).toBeInTheDocument();
	});

	test('It should display errors when inputs are empty', async () => {
		const {getByText} = renderWithProviders(<RegisterPage />);
		const submitButton = getByText('Create an account');

		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(getByText('Password field is required')).toBeInTheDocument();
			expect(getByText('Email field is required')).toBeInTheDocument();
		});
	});

	test("It should display an error when passwords don't match", async () => {
		const {getByText, getByPlaceholderText, getByDisplayValue} =
			renderWithProviders(<RegisterPage />);
		const submitButton = getByText('Create an account');
		const passwordInput = getByPlaceholderText('Enter your password');
		const repeatPasswordInput = getByPlaceholderText(
			'Repeat your password',
		);

		fireEvent.input(passwordInput, {target: {value: '123456'}});
		fireEvent.input(repeatPasswordInput, {target: {value: '1234567'}});

		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(getByText('Passwords must be the same')).toBeInTheDocument();
		});
	});

	test("It should display an error when password's length is less than 6", async () => {
		const {getByText, getByPlaceholderText} = renderWithProviders(
			<RegisterPage />,
		);
		const submitButton = getByText('Create an account');
		const passwordInput = getByPlaceholderText('Enter your password');
		const repeatPasswordInput = getByPlaceholderText(
			'Repeat your password',
		);

		fireEvent.input(passwordInput, {target: {value: '1234'}});
		fireEvent.input(repeatPasswordInput, {target: {value: '1234'}});

		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(
				getByText('Password length must be greater than 6'),
			).toBeInTheDocument();
		});
	});
});
