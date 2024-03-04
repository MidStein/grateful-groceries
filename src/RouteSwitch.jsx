import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import ShopPage from './components/ShopPage';

const RouteSwitch = () => {
	return (
		<BrowserRouter basename="/grateful-groceries">
			<NavBar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/shop' element={<ShopPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default RouteSwitch;
