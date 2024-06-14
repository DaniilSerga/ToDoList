import {renderWithProviders} from 'utils/testing';
import Navbar from './Navbar';

describe('Navbar tests', () => {
	test('It renders navbar', () => {
		const {getByText} = renderWithProviders(<Navbar />);
		expect(getByText('Projects')).toBeInTheDocument();
	});
});

export {};
