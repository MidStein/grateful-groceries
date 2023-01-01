import { useLocation } from 'react-router-dom';
const ShopPage = () => {
	const location = useLocation();
	return (
		<div className='ShopPage'>
			<h1>Hello World</h1>
		</div>
	);
}

export default ShopPage;
