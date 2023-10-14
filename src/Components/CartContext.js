// CartContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState({});

  const sections = ['services', 'firearms', 'parts', 'accessories', 'ammunition'];

  const getCart = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
  
      const headers = {
        'Authorization': `${token}`,
        'Content-Type': 'application/json',
      };
  
      // Make an API call to fetch the user data
      const response = await axios.get(`http://localhost:3002/api/get-cart-data/${userId}`, { headers });
      
      if (response.status === 200) {
        const userCartData = response.data.user;
        console.log(userCartData.cart);
        setCartItems(userCartData.cart)
      } else {
        console.error('Error fetching cart data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  //This will run every time cartItems changes to refresh cartData
  useEffect(() => {
    // Check if cartItems is an array before filtering
    if (Array.isArray(cartItems)) {
      const newCartData = sections.reduce((acc, section) => {
        acc[section] = cartItems.filter((item) => item.section === section);
        return acc;
      }, {});
      setCartData(newCartData);
    }
  }, [cartItems]);
  

  {/*const cartData = sections.reduce((acc, section) => {
    acc[section] = cartItems.filter((item) => item.section === section);
    return acc;
  }, {});*/}

  const clearCart = () => {
    setCartItems([]); // Clear the cart by setting it to an empty array
  };

  const postToUserCart = async (items) => {
    try {
      const _id = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const headers = {
        'Authorization': `${token}`,
        'Content-Type': 'application/json',
      };

      // Make an API call to fetch the user data
      const response = await axios.post(`http://localhost:3002/api/post-cart`, { _id, items}, { headers });

      if (response.status === 201) {
        console.log('Cart updated successfully!', items);
      } else {
        console.error('Error updating cart:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
  }
};

// Use useEffect to trigger the API call after cartItems have been updated
useEffect(() => {
  postToUserCart(cartItems);
  console.log(cartItems);
}, [cartItems]);

const addToCart = (item) => {
  if (item && item.id) {
    // Check if cartItems is an array and not empty
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );

      // Check if the item was found in the cart
      const itemExists = updatedCartItems.some((cartItem) => cartItem.id === item.id);

      if (itemExists) {
        setCartItems(updatedCartItems);
      } else {
        // Item not found in cart, add it
        setCartItems([...updatedCartItems, { ...item, quantity: 1 }]);
      }
    } else {
      // Cart is empty or not an array, create a new cart
      setCartItems([{ ...item, quantity: 1 }]);
    }
  } else {
    console.error('Invalid item: ', item);
  }
};

const removeFromCart = (itemId) => {
  console.log('Remove Item with ID: ', itemId);
  console.log('Previous Cart Items: ', cartItems);
  if (itemId !== null && itemId !== undefined) {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== itemId)
    );
  } else {
    console.error('Invalid itemId:', itemId);
  }
};


const increaseQuantity = (itemId) => {
  setCartItems((prevCartItems) =>
    prevCartItems.map((cartItem) =>
      cartItem.id === itemId
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  );
};

const decreaseQuantity = (itemId) => {
  setCartItems((prevCartItems) => {
    const updatedCartItems = prevCartItems.map((cartItem) =>
      cartItem.id === itemId
        ? {
            ...cartItem,
            quantity: cartItem.quantity > 1 ? cartItem.quantity - 1 : 1,
          }
        : cartItem
    );

    // If the quantity becomes 0, remove the item from the cart
    const itemToRemove = updatedCartItems.find((cartItem) => cartItem.id === itemId);
    if (itemToRemove && itemToRemove.quantity === 0) {
      removeFromCart(itemId);
    }

    return updatedCartItems;
  });
};


const cartQuantity = cartData.length;


  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartData, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, cartQuantity, getCart }}>
      {children}
    </CartContext.Provider>
  );
};


