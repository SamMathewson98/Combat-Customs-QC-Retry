import React, { useState, useRef, useEffect, useContext } from 'react';
import logo from './CC Logo.png';
import HamburgerMenu from './HamburgerMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Correct import statement
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import CartPage from '../Pages/CartPage';
import '../Components/OverallStyleSheet.css';
import { useAccountContext } from './AccountContext';
import Login from './Login';
import backgroundPhoto from './Anotha One.jpg';

function Navi() {
const [isCartOpen, setIsCartOpen] = useState(false); // State to track cart visibility
const { state, dispatch } = useAccountContext(); // State to use account functionality
const [isAccountOpen, setIsAccountOpen] = useState(false); // State to track account visibility
const loginRef = useRef(null); // Ref for the login popup
const cartRef = useRef(null); // Ref for the cart popout
const { cartQuantity } = useCart;

const handleAccountIconClick = (e) => {
  e.stopPropagation(); // Prevent event propagation
  setIsAccountOpen(!isAccountOpen); // Toggle the account visibility state
};


// Cart Icon click handlers
const handleCartIconClick = () => {
  setIsCartOpen(!isCartOpen); // Toggle the cart visibility state
};

const handleCartClose = () => {
  setIsCartOpen(false); // Close the cart
};

  // Add an event listener when the account component mounts
  useEffect(() => {
    const handleClickOutsideAccount = (event) => {
      // Check if the click target is not within the login popup or account icon
      if (
        isAccountOpen &&
        loginRef.current &&
        !loginRef.current.contains(event.target) &&
        !event.target.classList.contains('Account') 
      ) {
        setIsAccountOpen(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener('click', handleClickOutsideAccount);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutsideAccount);
    };
  }, [isAccountOpen]);

  // Add an event listener when the cart component mounts
  useEffect(() => {
    const handleClickOutsideCart = (event) => {
      // Check if the click target is not within the login popup or account icon
      if (
        isCartOpen &&
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        !event.target.classList.contains('CartIcon')
      ) {
        setIsCartOpen(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener('click', handleClickOutsideCart);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutsideCart);
    };
  }, [isCartOpen]);

// Account click handlers
const handleLogout = () => {
  dispatch({ type: 'LOGOUT' }); // Log out of account
};

  return (
    <div className='NavBar'>
      <div className='Top-Navi'>
        <div className='Logo'>
          <Link to="/">
            <div className='logo-container'>
              <img src={logo} className='App-logo'/>
            </div>
            </Link>
        </div>
        <div className='company-title'>
          <h2>Combat Customs</h2>
        </div>
        <div className='CartandAccount'>
          <div className='Account'>
          <span onClick={handleAccountIconClick}>
           <FontAwesomeIcon icon={faUser} className='account-icon' />
           </span>
          </div>
          {/*
          <button className='CartIcon' onClick={handleCartIconClick} >
              <FontAwesomeIcon icon={faShoppingCart} className='icon cart-icon' />
          </button>
      {isCartOpen && 
      <div className='cart-content' ref={cartRef} >
      <CartPage onCloseCart={handleCartClose} />
      </div>
      }*/}
      {isAccountOpen && 
      <div className='account-content' ref={loginRef}>
      <Login /> 
      </div>
        }
          </div>
      </div>
      <div className='BottomNavi'> 
        <Link className='NavLink' to="/Services">Services</Link>
        <Link className='NavLink' to="/GunList">Firearms</Link>
        <Link className='NavLink' to="/Accessories">Accessories</Link>
        <Link className='NavLink' to="/ContactUs">Contact Us</Link>
        <Link className='NavLink' to="/AboutUs">About Us</Link>
        <HamburgerMenu style={{ zIndex: 4 }}/>
      </div>
    </div>
  );
}

export default Navi;
