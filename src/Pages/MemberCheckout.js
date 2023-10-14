import React, { useEffect, useState } from 'react';
import Navi from '../Components/Navi';
import '../Components/OverallStyleSheet.css';
import { useAccountContext } from '../Components/AccountContext';
import { useCart } from '../Components/CartContext';
import { useNavigate } from 'react-router';
import axios from 'axios';

function MemberCheckout() {
    const { cartData, cartItems, clearCart } = useCart(); // Access the cart items from the context
    const sections = Object.keys(cartData);
    const [isLoading, setLoading] = useState(true);
    const { state, dispatch } = useAccountContext();
    const { user } = state
    const [memberCheckout, setMemberCheckout] = useState({
        _id: user?.id || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: {
            street1: user?.address.street1 || '',
            street2: user?.address.street2 || '',
            city: user?.address.city || '',
            state: user?.address.state || '',
            zip: user?.address.zip || '',
            country: user?.address.country || ''
        },
    })

   // useEffect to check for JWT in localStorage
   useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      console.log('Fetched Token: ', token);
      // You can add logic here to validate the token on the server-side if needed
      // If the token is valid, set isAuthenticated to true and refresh userData
      // For simplicity, we assume the token is valid for this example
      const fetchUserData = async () => {
        try {
          const userId = localStorage.getItem("userId");

          const headers = {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
          };
  
          // Make an API call to fetch the user data
          const userDataResponse = await axios.get(`http://localhost:3002/api/get-user-data/${userId}`, { headers });
  
          if (userDataResponse.status === 200) {
            const updatedUserData = userDataResponse.data.user;
            console.log(updatedUserData)
            dispatch({ type: 'SET_USER', payload: updatedUserData });
            setMemberCheckout(updatedUserData);
            setLoading(false);
          } else {
            console.error('Error fetching user data:', userDataResponse.data.message);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      // Call the fetchUserData function when the component mounts
      fetchUserData();
    }
  }, []); // Empty dependency array, runs once on component mount
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // To handle nested address object properties
        if (name.includes('address.')) {
          const addressField = name.split('.')[1];
          setMemberCheckout((prevData) => ({
            ...prevData,
            address: {
              ...prevData.address,
              [addressField]: value,
            },
          }));
        } else {
          setMemberCheckout({
            ...MemberCheckout,
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
      
        if (cartItems && cartItems !== null) {
        try {
          // Create the user object to send to the server
          const newOrder = {
            _id: memberCheckout._id,
            firstName: memberCheckout.firstName,
            lastName: memberCheckout.lastName,
            phone: memberCheckout.phone,
            email: memberCheckout.email,
            address: {
                street1: memberCheckout.address.street1,
                street2: memberCheckout.address.street2,
                city: memberCheckout.address.city,
                state: memberCheckout.address.state,
                zip: memberCheckout.address.zip,
                country: memberCheckout.address.country
            },
            orderContent: cartItems,
            hasAccount: state.isAuthenticated
          };
      
          // Send the new order data to the server
          const response = await axios.post('http://localhost:3002/api/post-order', newOrder);
      
          if (response.status === 201) {
            console.log('Order posted successfully!', newOrder);
      
            // Redirect to the home page
            clearCart();
            navigate('/');
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
        <Navi />{isLoading ? (
        // Render a loading indicator while data is being fetched
        <div>Loading...</div>
      ) : (
        <div className='two-sections'>
            <div className='checkout-information'>
            <form className='ContactForm' onSubmit={handleSubmit}>
            <label htmlFor="firstName" className='FormElement'>First Name:</label>
            <input type="text" name="firstName" className='FormElement' placeholder={memberCheckout.firstName} value={memberCheckout.firstName} onChange={handleChange} />
            <label htmlFor="lastName" className='FormElement'>Last Name:</label>
            <input type="text" name="lastName" className='FormElement' placeholder={memberCheckout.lastName} value={memberCheckout.lastName} onChange={handleChange} />
            <label htmlFor="email" className='FormElement'>Email:</label>
            <input type="email" name="email" className='FormElement' placeholder={memberCheckout.email} value={memberCheckout.email} onChange={handleChange} />
            <label htmlFor="phone" className='FormElement'>Phone Number:</label>
            <input type="tel" name="phone" className='FormElement' placeholder={memberCheckout.phone} value={memberCheckout.phone} onChange={handleChange} />
            <label htmlFor="street1" className='FormElement'>New Address Line 1: </label>
            <input type="text" name="address.street1" className='FormElement' placeholder={memberCheckout.address.street1} value={memberCheckout.address.street1} onChange={handleChange} />
            <label htmlFor="street2" className='FormElement'>New Address Line 2:</label>
            <input type="text" name="address.street2" className='FormElement' placeholder={memberCheckout.address.street2} value={memberCheckout.address.street2} onChange={handleChange} />
            <label htmlFor="city" className='FormElement'>New City:</label>
            <input type="text" name="address.city" className='FormElement' placeholder={memberCheckout.address.city} value={memberCheckout.address.city} onChange={handleChange} />
            <label htmlFor="state" className='FormElement'>New State:</label>
            <input type="text" name="address.state" className='FormElement' placeholder={memberCheckout.address.state} value={memberCheckout.address.state} onChange={handleChange} />
            <label htmlFor="zip" className='FormElement'>New Zip Code:</label>
            <input type="text" name="address.zip" className='FormElement' placeholder={memberCheckout.address.zip} value={memberCheckout.address.zip} onChange={handleChange} />
            <label htmlFor="country" className='FormElement'>New Country:</label>
            <input type="text" name="address.country" className='FormElement'  placeholder={memberCheckout.address.country} value={memberCheckout.address.country} onChange={handleChange} />
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
      )}
    </div>
  )
}

export default MemberCheckout;