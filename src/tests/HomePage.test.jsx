import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../components/HomePage';

describe('Home Page', () => {
	it('renders grocery types and grocery item', () => {
		const { container } = render(
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		);

		expect(container).toMatchSnapshot();
	});

	it('renders go to cart clickable image', () => {
		render(
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		);

		const cartButton = screen.getByAltText('go to cart');
		expect(cartButton).toBeInTheDocument();
	});

	it('renders price in correct format', () => {
		render(
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		);

		const itemPrices = screen.getAllByText(/Rs\. \d+\/-/);
		expect(itemPrices[0]).toBeInTheDocument();
	});

	it('renders add to cart button', () => {
		render(
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		);

		const buttons = screen.getAllByRole('button', {name: /Add to /});
		expect(buttons[0]).toBeInTheDocument();
	});
	
	describe('item card input', () => {
		it('value increments/decrements on clicking on respective button', () => {
			render(
				<BrowserRouter>
					<HomePage />
				</BrowserRouter>
			);

			const incBtns = screen.getAllByText('+');
			const decBtns = screen.getAllByText('-');
			const inputs = screen.getAllByRole('textbox');

			userEvent.click(incBtns[0]);
			expect(inputs[0].value).toBe('1');
			userEvent.dblClick(decBtns[0]);
			expect(inputs[0].value).toBe('0');
			userEvent.dblClick(incBtns[0]);
			expect(inputs[0].value).toBe('2');
			userEvent.dblClick(decBtns[0]);
			userEvent.dblClick(decBtns[0]);
			expect(inputs[0].value).toBe('0');
		});

		it('changes according to user typing', () => {
			render(
				<BrowserRouter>
					<HomePage />
				</BrowserRouter>
			);

			const inputs = screen.getAllByRole('textbox');

			userEvent.type(inputs[0], '12');
			expect(inputs[0].value).toBe('12');
			userEvent.clear(inputs[0]);
			userEvent.type(inputs[0], '010');
			expect(inputs[0].value).toBe('10');
		});
	});

	it('renders number of items in cart correctly', () => {
		render(
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		);

		const countCart = screen.getByTestId('count-cart');
		const decBtns = screen.getAllByRole('button', { name: '-' });
		const inputs = screen.getAllByRole('textbox');
		const incBtns = screen.getAllByRole('button', { name: '+' });
		const addBtns = screen.getAllByRole('button', { name: /Add to / });

		expect(countCart.textContent).toBe('0');

		userEvent.click(incBtns[0]);
		userEvent.click(addBtns[0]);
		expect(countCart.textContent).toBe('1');

		userEvent.click(addBtns[1]);
		userEvent.dblClick(incBtns[1]);
		expect(countCart.textContent).toBe('3');

		userEvent.click(incBtns[2]);
		userEvent.click(addBtns[2]);
		userEvent.click(decBtns[2]);
		expect(countCart.textContent).toBe('3');

		userEvent.type(inputs[3], '3');
		userEvent.click(addBtns[3]);
		expect(countCart.textContent).toBe('6');
	});
});
