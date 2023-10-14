import React, { useEffect, useState } from 'react';
import '../Components/OverallStyleSheet.css'
import { useCart } from '../Components/CartContext'
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { useAccountContext } from '../Components/AccountContext';

const CartPage = ({ onCloseCart }) => {
  const [isCartOpen, setIsCartOpen] = useState(true); // State to track whether the cart is open or closed
  const { state } = useAccountContext();
  const { user } = state;

  // Sample cart data structure
  const { cartData, removeFromCart, increaseQuantity, decreaseQuantity, getCart } = useCart();

  useEffect(() => {
    getCart();
  },[state.isAuthenticated]);

  const sections = Object.keys(cartData);

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  // Function to calculate total price
  const calculateTotalPrice = (cartData) => {
    var totalPrice =
      cartData.services.reduce((acc, item) => acc + item.price * item.quantity, 0) +
      cartData.firearms.reduce((acc, item) => acc + item.price * item.quantity, 0) +
      cartData.parts.reduce((acc, item) => acc + item.price * item.quantity, 0) +
      cartData.accessories.reduce((acc, item) => acc + item.price * item.quantity, 0) +
      cartData.ammunition.reduce((acc, item) => acc + item.price * item.quantity, 0);

      totalPrice = totalPrice.toFixed(2);

    return totalPrice;
  };
  
console.log(cartData);
return (
  <div className={`Cart ${isCartOpen ? '' : 'hidden'}`}>
    {/* "X" button to close the cart */}
    {isCartOpen && (
      <button className="cart-close-btn" onClick={handleCartClose}>
        X
      </button>
    )}

    {/* Cart sections */}
    {sections.map((section, index) => (
      <div key={`section-${index}`} className="cart-section">
        <h2>{section.charAt(0).toUpperCase() + section.slice(1)}</h2>
        {cartData[section].length === 0 ? (
          <p>No items added</p>
        ) : (
          cartData[section].map((item) => (
            <div key={item.id} className='cart-item'>
              <p className='cart-item-title'>{item.name}</p>
              <div className='cart-quantity'>
              <p>Quantity:</p><FaMinus className='quantity-icon'onClick={() => decreaseQuantity(item.id)} /> <p className='amount-in-cart'>{item.quantity}</p><FaPlus className='quantity-icon' onClick={() => increaseQuantity(item.id)}/>
              </div>
              <p>Price: ${item.price*item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))
        )}
      </div>
    ))}

    {/* Total Price */}
    <div className="cart-total">
      <h2>Total Price</h2>
      {/* Calculate and display total price */}
      <p>Total: ${calculateTotalPrice(cartData)}</p>
      <Link to='/Checkout'><button className='checkout'>Checkout</button></Link>
    </div>
  </div>
);
}

export default CartPage;
