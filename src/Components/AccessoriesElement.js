import React, { useCallback, useState } from 'react';
import './OverallStyleSheet.css';
import { useCart } from './CartContext'; // Import the useCart hook
import PopoutModal from './PopoutModal';

const AccessoriesElement = ({ AccessoriesObject }) => {
  const { addToCart } = useCart(); // Access the addToCart function from the context
  const [isModalOpen, setIsModalOpen] = useState(false);

    // Create an item object to add to the cart
    const cartItem = {
      id: AccessoriesObject.fields.id, // Make sure to assign a unique ID to each item
      name: AccessoriesObject.fields.name,
      price: AccessoriesObject.fields.salePrice || AccessoriesObject.fields.price, // Use salePrice if available
      quantity: 1,
      section: 'accessories', // Specify the section the item belongs to
    };
    
    const openModal = () => {
      setIsModalOpen((prevState) => {
        console.log('Popout Open: ' + !prevState);
        return !prevState;
      });};

    const closeModal = () => {
      setIsModalOpen(false);
      console.log('Popout Open: false');
    };

    if(AccessoriesObject.fields.onSale == false && AccessoriesObject.fields.inStock >= 5){
  return (
    <div className='gun-element'>
      <h5 className='gun-title' onClick={openModal}>{AccessoriesObject.fields.name}</h5>
      {isModalOpen && (
        <PopoutModal itemContent={AccessoriesObject} closeModal={closeModal} addToCart={addToCart} cartItem={cartItem}/>
      )}
      {/*<img src={AccessoriesObject.image} alt="Gun" className='gun-image'/>*/}
      <p>Type: {AccessoriesObject.fields.type}</p>
      <p>Price: ${AccessoriesObject.fields.price}</p>
      <br />
      <p>Description: {AccessoriesObject.fields.description}</p>
      <br />
      <button className='BuyButton' onClick={() => addToCart(cartItem)}>Add to Cart</button>
      <br />
    </div>
  );
    }
   else if(AccessoriesObject.fields.onSale == false && AccessoriesObject.fields.inStock >= 1){
      return (
        <div className='gun-element'>
          <h5 className='gun-title' onClick={openModal}>{AccessoriesObject.fields.name}</h5>
          {isModalOpen && (
            <PopoutModal itemContent={AccessoriesObject} closeModal={closeModal} addToCart={addToCart} cartItem={cartItem}/>
          )}
          {/*<img src={AccessoriesObject.image} alt="Gun" className='gun-image'/>*/}
          <p>Type: {AccessoriesObject.fields.type}</p>
          <p>Price: ${AccessoriesObject.fields.price}</p>
          <br />
          <p>Description: {AccessoriesObject.fields.description}</p>
          <br />
          <p className='quantity-left'>Only {AccessoriesObject.fields.inStock} left in stock!</p>
          <button className='BuyButton' onClick={() => addToCart(cartItem)}>Add to Cart</button>
          <br />
        </div>
      );
        }
   else if(AccessoriesObject.fields.onSale == false && AccessoriesObject.fields.inStock == 0){
          return (
            <div className='gun-element'>
              <h5 className='gun-title' onClick={openModal}>{AccessoriesObject.fields.name}</h5>
              {isModalOpen && (
                <PopoutModal itemContent={AccessoriesObject} closeModal={closeModal} addToCart={addToCart} cartItem={cartItem}/>
              )}
              {/*<img src={AccessoriesObject.image} alt="Gun" className='gun-image'/>*/}
              <p>Type: {AccessoriesObject.fields.type}</p>
              <p>Price: ${AccessoriesObject.fields.price}</p>
              <br />
              <p>Description: {AccessoriesObject.fields.description}</p>
              <br />
              <h5 style={{ fontStyle: 'italic', color: 'gray'}}>Out of Stock</h5>
              <br />
            </div>
          );
            }
  else if (AccessoriesObject.fields.onSale == true && AccessoriesObject.fields.inStock >= 5) {
    return (
        <div className='gun-element'>
          <h5 className='gun-title' onClick={openModal}>{AccessoriesObject.fields.name}</h5>
      {isModalOpen && (
        <PopoutModal itemContent={AccessoriesObject} closeModal={closeModal} addToCart={addToCart} cartItem={cartItem}/>
      )}
          {/*<img src={AccessoriesObject.image} alt="Gun" className='gun-image' />*/}
          <p className='gun-type'>Type: {AccessoriesObject.fields.type}</p>
          <p className='gun-price'>Price: <span style={{ textDecoration: 'line-through' }}>${AccessoriesObject.fields.price}</span>${AccessoriesObject.fields.salePrice}</p>
      <br />
          <p className='gun-description'>Description: {AccessoriesObject.fields.description}</p>
          <br />
      <button className='BuyButton' onClick={() => addToCart(cartItem)}>Add to Cart</button>
          <br />
        </div>)
  }
  else if (AccessoriesObject.fields.onSale == true && AccessoriesObject.fields.inStock >= 1) {
    return (
        <div className='gun-element'>
          <h5 className='gun-title' onClick={openModal}>{AccessoriesObject.fields.name}</h5>
      {isModalOpen && (
        <PopoutModal itemContent={AccessoriesObject} closeModal={closeModal} addToCart={addToCart} cartItem={cartItem}/>
      )}
          {/*<img src={AccessoriesObject.image} alt="Gun" className='gun-image' />*/}
          <p className='gun-type'>Type: {AccessoriesObject.fields.type}</p>
          <p className='gun-price'>Price: <span style={{ textDecoration: 'line-through' }}>${AccessoriesObject.fields.price}</span>${AccessoriesObject.fields.salePrice}</p>
      <br />
          <p className='gun-description'>Description: {AccessoriesObject.fields.description}</p>
          <br />
          <p className='quantity-left'>Only {AccessoriesObject.fields.inStock} left in stock!</p>
      <button className='BuyButton' onClick={() => addToCart(cartItem)}>Add to Cart</button>
          <br />
        </div>)
  }
  else {
    return (
      <div className='gun-element'>
        <h5 className='gun-title' onClick={openModal}>{AccessoriesObject.fields.name}</h5>
    {isModalOpen && (
      <PopoutModal itemContent={AccessoriesObject} closeModal={closeModal} addToCart={addToCart} cartItem={cartItem}/>
    )}
        {/*<img src={AccessoriesObject.image} alt="Gun" className='gun-image' />*/}
        <p className='gun-type'>Type: {AccessoriesObject.fields.type}</p>
        <p className='gun-price'>Price: <span style={{ textDecoration: 'line-through' }}>${AccessoriesObject.fields.price}</span>${AccessoriesObject.fields.salePrice}</p>
    <br />
        <p className='gun-description'>Description: {AccessoriesObject.fields.description}</p>
        <br />
          <h5 style={{ fontStyle: 'italic', color: 'gray'}}>Out of Stock</h5>
        <br />
      </div>)
  }
}; 

export default AccessoriesElement;