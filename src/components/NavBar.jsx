import '../styles/NavBar.css';
import { Link } from 'react-router-dom';
import logoSrc from '../images/logo.png'

function NavBar() {
  return (
    <div className='NavBar'>
      <div className='hero-stuff'>
        <img src={logoSrc} alt="logo" />
        <div>Grateful Groceries</div>
      </div>
      <ul className='nav-links'>
        <Link to='/'>
          <li>Home</li>
        </Link>
        <Link to='/shop'>
          <li>Shop</li>
        </Link>
      </ul>
    </div>
  );
}

export default NavBar;
