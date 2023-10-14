import React, { useCallback, useState } from 'react';
import './OverallStyleSheet.css';
import { useCart } from './CartContext'; // Import the useCart hook
import PopoutModal from './PopoutModal';

const PartElement = ({ partObject }) => {
  const { addToCart } = useCart(); // Access the addToCart function from the context
  const [isModalOpen, setIsModalOpen] = useState(false); 

    // Create an item object to add to the cart
    const cartItem = {
      id: partObject.fields.id, // Make sure to assign a unique ID to each item
      name: partObject.fields.name,
      price: partObject.fields.salePrice || partObject.fields.price, // Use salePrice if available
      quantity: 1,
      section: 'parts', // Specify the section the item belongs to
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

    if(partObject.fields.onSale == false && partObject.fields.inStock >= 5){
  return (
    <div className='gun-element'>
      <h5 className='gun-title' onClick={openModal}>{partObject.fields.name}</h5>
      {isModalOpen && (
        <PopoutModal itemContent={partObject} closeModal={closeModal} addToCart={addToCart} cartItem={cartItem}/>
      )}
      {/*<img src={partObject.image} alt="Gun" className='gun-image'/>*/}
      <p>Type: {partObject.fields.type}</p>
      <p>Price: ${partObject.fields.price}</p>
      <br />
      <p>Description: {partObject.fields.description}</p>
      <br />
      <button className='BuyButton' onClick={() => addToCart(cartItem)}>Add to Cart</button>
      <br />
    </div>
  );
    }
  else if(partObject.fields.onSale == false && partObject.fields.inStock >= 1){
      return (
        <div className='gun-element'>
          <h5 className='gun-title' onClick={openModal}>{partObject.fields.name}</h5>
          {isModalOpen && (
            <PopoutModal itemContent={partObject} closeModal={closeModal} addToCart={addToCart} cartItem={cartItem}/>
          )}
          {/*<img src={partObject.image} alt="Gun" className='gun-image'/>*/}
          <p>Type: {partObject.fields.type}</p>
          <p>Price: ${partObject.fields.price}</p>
          <br />
          <p>Description: {partObject.fields.description}</p>
          <br />
          <p className='quantity-left'>Only {partObject.fields.inStock} left in stock!</p>
          <button className='BuyButton' onClick={() => addToCart(cartItem)}>Add to Cart</button>
          <br />
        </div>
      );
        }
  else if(partObject.fields.onSale == false && partObject.fields.inStock == 0){
      return (
        <div className='gun-element'>
          <h5 className='gun-title' onClick={openModal}>{partObject.fields.name}</h5>
          {isModalOpen && (
            <PopoutModal itemContent={partObject} closeModal={closeModal} addToCart={addToCart} cartItem={cartItem}/>
          )}
          {/*<img src={partObject.image} alt="Gun" className='gun-image'/>*/}
          <p>Type: {partObject.fields.type}</p>
          <p>Price: ${partObject.fields.price}</p>
          <br />
          <p>Description: {partObject.fields.description}</p>
          <br />
              <h5 style={{ fontStyle: 'italic', color: 'gray'}}>Out of Stock</h5>
          <br />
        </div>
      );
        }
  else if(partObject.fields.onSale == true && partObject.fields.inStock >= 5) {
    return (
        <div className='gun-element'>
          <h5 className='gun-title' onClick={openModal}>{partObject.fields.name}</h5>
      {isModalOpen && (
        <PopoutModal itemContent={partObject} closeModal={closeModal} addToCart={addToCart} cartItem={cartItem}/>
      )}
          {/*<img src={partObject.image} alt="Gun" className='gun-image' />*/}
          <p className='gun-type'>Type: {partObject.fields.type}</p>
          <p className='gun-price'>Price: <span style={{ textDecoration: 'line-through' }}>${partObject.fields.price}</span>${partObject.fields.salePrice}</p>
      <br />
          <p className='gun-description'>Description: {partObject.fields.description}</p>
          <br />
      <button className='BuyButton' onClick={() => addToCart(cartItem)}>Add to Cart</button>
          <br />
        </div>)
  }
  else if(partObject.fields.onSale == true && partObject.fields.inStock >= 1) {
    return (
        <div className='gun-element'>
          <h5 className='gun-title' onClick={openModal}>{partObject.fields.name}</h5>
      {isModalOpen && (
        <PopoutModal itemContent={partObject} closeModal={closeModal} addToCart={addToCart} cartItem={cartItem}/>
      )}
          {/*<img src={partObject.image} alt="Gun" className='gun-image' />*/}
          <p className='gun-type'>Type: {partObject.fields.type}</p>
          <p className='gun-price'>Price: <span style={{ textDecoration: 'line-through' }}>${partObject.fields.price}</span>${partObject.fields.salePrice}</p>
      <br />
          <p className='gun-description'>Description: {partObject.fields.description}</p>
          <br />
          <p className='quantity-left'>Only {partObject.fields.inStock} left in stock!</p>
      <button className='BuyButton' onClick={() => addToCart(cartItem)}>Add to Cart</button>
          <br />
        </div>)
  }
  else {
    return (
      <div className='gun-element'>
        <h5 className='gun-title' onClick={openModal}>{partObject.fields.name}</h5>
    {isModalOpen && (
      <PopoutModal itemContent={partObject} closeModal={closeModal} addToCart={addToCart} cartItem={cartItem}/>
    )}
        {/*<img src={partObject.image} alt="Gun" className='gun-image' />*/}
        <p className='gun-type'>Type: {partObject.fields.type}</p>
        <p className='gun-price'>Price: <span style={{ textDecoration: 'line-through' }}>${partObject.fields.price}</span>${partObject.fields.salePrice}</p>
    <br />
        <p className='gun-description'>Description: {partObject.fields.description}</p>
        <br />
              <h5 style={{ fontStyle: 'italic', color: 'gray'}}>Out of Stock</h5>
        <br />
      </div>)
  }
}; 

export default PartElement;