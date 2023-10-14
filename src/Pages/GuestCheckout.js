import React, { useState } from 'react';
import Navi from '../Components/Navi';
import '../Components/OverallStyleSheet.css';
import { useAccountContext } from '../Components/AccountContext';
import { useCart } from '../Components/CartContext';
import { useNavigate } from 'react-router';
import axios from 'axios';

function GuestCheckout() {
    const { cartData, cartItems, clearCart } = useCart(); // Access the cart items from the context
    const sections = Object.keys(cartData);
    const { state } = useAccountContext();
    const [guestCheckout, setGuestCheckout] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: {
            street1: '',
            street2: '',
            city: '',
            state: '',
            zip: '',
            country: ''
        },
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // To handle nested address object properties
        if (name.includes('address.')) {
          const addressField = name.split('.')[1];
          setGuestCheckout((prevData) => ({
            ...prevData,
            address: {
              ...prevData.address,
              [addressField]: value,
            },
          }));
        } else {
          setGuestCheckout({
            ...guestCheckout,
            [name]: value,
          });
        }
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

      const handleSubmit = async (event) => {
        event.preventDefault();
      if (cartItems.length > 0) {
        try {
          // Create the user object to send to the server
          const newOrder = {
            firstName: guestCheckout.firstName,
            lastName: guestCheckout.lastName,
            phone: guestCheckout.phone,
            email: guestCheckout.email,
            address: {
                street1: guestCheckout.address.street1,
                street2: guestCheckout.address.street2,
                city: guestCheckout.address.city,
                state: guestCheckout.address.state,
                zip: guestCheckout.address.zip,
                country: guestCheckout.address.country
            },
            orderContent: cartItems,
            hasAccount: state.isAuthenticated
          };
      
          // Send the new user data to the server
          const response = await axios.post('http://localhost:3002/api/post-order', newOrder);
      
          if (response.status === 201) {
            console.log('Account created successfully!', newOrder);
      
            clearCart();
            // Redirect to the home page
            navigate('/'); // Make sure to import `useHistory` from 'react-router-dom'
          } else {
            console.error('Error posting order:', response.data.message);
          }
        } catch (error) {
          console.error('Error posting order:', error);
        }
      } else {
        window.alert('No items in cart')
      }
    }

  return (
    <div className='body'>
        <Navi />
        <div className='two-sections'>
            <div className='checkout-information'>
            <form className='ContactForm' onSubmit={handleSubmit}>
            <label htmlFor="firstName" className='FormElement'>First Name:</label>
            <input type="text" name="firstName" className='FormElement' value={guestCheckout.firstName} onChange={handleChange} />
            <label htmlFor="lastName" className='FormElement'>Last Name:</label>
            <input type="text" name="lastName" className='FormElement' value={guestCheckout.lastName} onChange={handleChange} />
            <label htmlFor="email" className='FormElement'>Email:</label>
            <input type="email" name="email" className='FormElement' value={guestCheckout.email} onChange={handleChange} />
            <label htmlFor="phone" className='FormElement'>Phone Number:</label>
            <input type="tel" name="phone" className='FormElement' value={guestCheckout.phone} onChange={handleChange} />
            <label htmlFor="street1" className='FormElement'>New Address Line 1: </label>
            <input type="text" name="address.street1" className='FormElement' value={guestCheckout.address.street1} onChange={handleChange} />
            <label htmlFor="street2" className='FormElement'>New Address Line 2:</label>
            <input type="text" name="address.street2" className='FormElement' value={guestCheckout.address.street2} onChange={handleChange} />
            <label htmlFor="city" className='FormElement'>New City:</label>
            <input type="text" name="address.city" className='FormElement' value={guestCheckout.address.city} onChange={handleChange} />
            <label htmlFor="state" className='FormElement'>New State:</label>
            <input type="text" name="address.state" className='FormElement' value={guestCheckout.address.state} onChange={handleChange} />
            <label htmlFor="zip" className='FormElement'>New Zip Code:</label>
            <input type="text" name="address.zip" className='FormElement' value={guestCheckout.address.zip} onChange={handleChange} />
            <label htmlFor="country" className='FormElement'>New Country:</label>
            <input type="text" name="address.country" className='FormElement' value={guestCheckout.address.country} onChange={handleChange} />
            <button type="submit" className='FormElement'>Submit Order</button>         
        </form>
            </div>
            <div className='cart-review'>
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
              <p>Quantity:{item.quantity}</p>
              </div>
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
        </div>
    </div>
  )
}

export default GuestCheckout