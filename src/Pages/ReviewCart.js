import React, { useState } from 'react';
import { useCart } from '../Components/CartContext';
import '../Components/OverallStyleSheet.css';
import Navi from '../Components/Navi';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { useAccountContext } from '../Components/AccountContext';
import GuestOrMember from '../Components/GuestOrMember';
import { Link } from 'react-router-dom';

function ReviewCart() {
    const { cartData, removeFromCart,increaseQuantity, decreaseQuantity } = useCart(); // Access the cart items from the context
    const sections = Object.keys(cartData);
    const { state } = useAccountContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen((prevState) => {
        console.log('Popout Open: ' + !prevState);
        return !prevState;
      });};

      const closeModal = () => {
        setIsModalOpen(false);
        console.log('Popout Open: false');
      };

    // Function to calculate total price
    const calculateTotalPrice = (cartData) => {
      const totalPrice =
        cartData.services.reduce((acc, item) => acc + item.price * item.quantity, 0) +
        cartData.firearms.reduce((acc, item) => acc + item.price * item.quantity, 0) +
        cartData.parts.reduce((acc, item) => acc + item.price * item.quantity, 0) +
        cartData.accessories.reduce((acc, item) => acc + item.price * item.quantity, 0) +
        cartData.ammunition.reduce((acc, item) => acc + item.price * item.quantity, 0);

        totalPrice.toFixed(2);
  
      return totalPrice;
    };

  return (
    <div className='body'>
    <Navi />
    <div>
        <h2>Review Your Order</h2>
    </div>
    <div>
        {/* Cart sections */}
    {sections.map((section, index) => (
      <div key={`section-${index}`} className="cart-section">
    <h2>{section.charAt(0).toUpperCase() + section.slice(1)}</h2> 
        {cartData[section].length === 0 ? (
          <p>No items added</p>
        ) : (
          cartData[section].map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
              <div className='cart-quantity'>
              <p>Quantity:</p><FaMinus className='quantity-icon'onClick={() => decreaseQuantity(item.id)} /> <p className='amount-in-cart'>{item.quantity}</p><FaPlus className='quantity-icon' onClick={() => increaseQuantity(item.id)}/>
              </div>
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
    </div>
    </div>
    {!state.isAuthenticated ? (
    <button className='checkout' onClick={openModal} style={{marginBottom: '30px'}}>Proceed to Checkout</button>
    ) : (
      <Link to="/MemberCheckout"><button className='checkout' style={{marginBottom: '30px'}}>Proceed to Checkout</button></Link>
    )}
    {isModalOpen && (
      <GuestOrMember closeModal={closeModal} />
    )}
    </div>
  )
}

export default ReviewCart