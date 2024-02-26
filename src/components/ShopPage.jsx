import { useLocation } from 'react-router-dom';
import '../styles/ShopPage.css';

import apple from '../images/apple.png';
import banana from '../images/banana.png';
import cabbage from '../images/cabbage.png';
import chicken from '../images/chicken.png';
import goat from '../images/goat.png';
import lamb from '../images/lamb.png';
import mango from '../images/mango.png';
import potato from '../images/potato.png';
import spinach from '../images/spinach.png';

const itemImages = {
  apple,
  banana,
  cabbage,
  chicken,
  goat,
  lamb,
  mango,
  potato,
  spinach
};

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
            <img
              src={itemImages[`${item.name.toLowerCase()}`]}
              alt={item.name}
              className='item-pic'
            />
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
