import '../styles/HomePage.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import groceries from '../groceries.json';
const rc = require.context('../images', false);

const HomePage = () => {
	const [items, setItems] = useState({});

	useEffect(() => {
		const qtyDict = {};
		for (let i = 0; i < groceries.categories.length; i += 1) {
			for (let j = 0; j < groceries.categories[i].items.length; j += 1) {
				qtyDict[`${groceries.categories[i].items[j].name}`] = { qty: 0, isInCart: false };
			}
		}
		setItems(qtyDict);
	}, []);

	const countCart = () => {
		let cnt = 0;
		for (const item in items) {
			if (items[item].isInCart === true) {
				cnt += items[item].qty;
			}
		}
		return cnt;
	}

	const decrement = (itemName) => {
		if (items[itemName].qty > 0) {
			setItems(() => ({
				...items,
				[itemName]: { ...items[itemName], qty: items[itemName].qty - 1}
			}));
		}
	}
	const increment = (itemName) => {
		setItems(() => ({
			...items,
			[itemName]: { ...items[itemName], qty: items[itemName].qty + 1}
		}));
	}
	const changeHandler = (e, itemName) => {
		setItems(() => ({
			...items,
			[itemName]: { ...items[itemName], qty: Number(e.target.value) }
		}));
	}

	const addToCart = (e, itemName) => {
		e.target.style.backgroundColor = '#22c55e';
		setItems({
			...items,
			[itemName]: { ...items[itemName], isInCart: true }
		})
	}

	return (
		<div className='HomePage'>
			<div 
				style={{ backgroundColor: countCart() > 0 ? '#4ade80' : '#d9f99d' }} 
				className="sticky"
			>
				{countCart()}
				<Link to='/shop' state={{ items: items }}>
					<img src={rc('./cart.svg')} alt="go to cart" className='cart-button'/>
				</Link>
			</div>
			{groceries.categories.map((category) => (
				<div key={category.category}>
					<div className="grocery-type">
						<img src={rc(`./${category.category.toLowerCase()}.png`)} alt={category.category} />
						<div>{category.category}</div>
					</div>
					<div className='type-group'>
					{category.items.map((item) => {
							return (
								<div className="item-card" key={item.name}>
									<img src={rc(`./${item.name.toLowerCase()}.png`)} alt={item.name} className="item-pic" />
									<div className="item-name">{item.name}</div>
									<div className="item-price">Rs. {item.price}/-</div>
									<div className="quantity">
										<button onClick={() => decrement(item.name)}>-</button>
										<input type="text" value={items[`${item.name}`]?.qty || 0} onChange={(e) => changeHandler(e, item.name)} />
										<button onClick={() => increment(item.name)}>+</button>
									</div>
									<button onClick={(e) => addToCart(e, item.name)}>Add to <img src={rc('./cart.svg')} alt='cart'/></button>
								</div>
							);
					})}
					</div>
				</div>
			))}
		</div>
	);
}

export default HomePage;
