import { useLocation } from 'react-router-dom';
import '../styles/ShopPage.css';
const rc = require.context('../images', false);

const ShopPage = () => {
	const items = useLocation().state.items;

	const calculateCost = () => {
		let total = 0;
		for (const item in items) {
			if (items[item].isInCart) {
				total += items[item].qty * items[item].price;
			}
		}
		return total;
	}

	return (
		<div className='ShopPage'>
			{Object.values(items).map((item) => {
				if (item.isInCart) return (
					<div className='item-card' key={item.name}>
						<img src={rc(`./${item.name.toLowerCase()}.png`)} alt={item.name} className='item-pic' />
						<div>
							<div className="item-name">Name: {item.name}</div>
							<div className="item-price">Price: Rs. {item.price}/-</div>
							<div className="item-quantity">Quantity: {item.qty}</div>
						</div>
					</div>
				)
				return null;
			})}
			<div className="check-pay">
				<button>Checkout and pay Rs. {calculateCost()}/-</button>
			</div>
		</div>
	);
}

export default ShopPage;
