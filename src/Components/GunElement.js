import React, { useState, useEffect } from 'react';
import './OverallStyleSheet.css';
import { useCart } from './CartContext'; // Import the useCart hook
import PopoutModal from './PopoutModal';

const GunElement = ({ gunObject, id }) => {
  const { addToCart } = useCart(); // Access the addToCart function from the context
  const [isModalOpen, setIsModalOpen] = useState(false);

    // Create an item object to add to the cart
    const cartItem = {
      id: gunObject.fields.id, // Make sure to assign a unique ID to each item
      name: gunObject.fields.name,
      price: gunObject.fields.salePrice || gunObject.fields.price, // Use salePrice if available
      quantity: 1,
      section: 'firearms', // Specify the section the item belongs to
    };
    
    const openModal = () => {
      setIsModalOpen((prevState) => {
        console.log('Popout Open: ' + !prevState);
        return !prevState;
      });};

      useEffect(() => {
        // Check the ID criteria here and open the modal if it meets the criteria
        if (id === gunObject.fields.id) {
          openModal();
          console.log(id);
        }
      }, []); // Empty dependency array means this effect runs once when the component mounts

    const closeModal = () => {
      setIsModalOpen(false);
      console.log('Popout Open: false');
    };

    if(gunObject.fields.onSale === false && gunObject.fields.inStock >= 5){
  return (
    <div className='gun-element'>
      <h5 className='gun-title' onClick={openModal}>{gunObject.fields.name}</h5>
      {isModalOpen && (
        <PopoutModal id={id} itemContent={gunObject} closeModal={closeModal} addToCart={addToCart} cartItem={cartItem}/>
      )}
      {/*<img src={gunObject.fields.image} alt="Gun" className='gun-image'/>*/}
      <p>Type: {gunObject.fields.type}</p>
      <p>Price: ${gunObject.fields.price}</p>
      <br />
      <p>Description: {gunObject.fields.description}</p>
      <br />
      <button className='BuyButton' onClick={() => addToCart(cartItem)}>Add to Cart</button>
      <br />
    </div>
  );
    }
    else if(gunObject.fields.onSale === false && gunObject.fields.inStock >= 1){
      return (
        <div className='gun-element'>
          <h5 className='gun-title' onClick={openModal}>{gunObject.fields.name}</h5>
          {isModalOpen && (
            <PopoutModal id={id} itemContent={gunObject} closeModal={closeModal} addToCart={addToCart} cartItem={cartItem}/>
          )}
          {/*<img src={gunObject.fields.image} alt="Gun" className='gun-image'/>*/}
          <p>Type: {gunObject.fields.type}</p>
          <p>Price: ${gunObject.fields.price}</p>
          <br />
          <p>Description: {gunObject.fields.description}</p>
          <br />
          <p className='quantity-left'>Only {gunObject.fields.inStock} left in stock!</p>
          <button className='BuyButton' onClick={() => addToCart(cartItem)}>Add to Cart</button>
          <br />
        </div>
      );
        }
        else if(gunObject.fields.onSale === false && gunObject.fields.inStock === 0){
          return (
            <div className='gun-element'>
              <h5 className='gun-title' onClick={openModal}>{gunObject.fields.name}</h5>
              {isModalOpen && (
                <PopoutModal id={id} itemContent={gunObject} closeModal={closeModal} addToCart={addToCart} cartItem={cartItem}/>
              )}
              {/*<img src={gunObject.fields.image} alt="Gun" className='gun-image'/>*/}
              <p>Type: {gunObject.fields.type}</p>
              <p>Price: ${gunObject.fields.price}</p>
              <br />
              <p>Description: {gunObject.fields.description}</p>
              <br />
              <h5 style={{ fontStyle: 'italic', color: 'gray'}}>Out of Stock</h5>
              <br />
            </div>
          );
            }
         else if(gunObject.fields.onSale === true && gunObject.fields.inStock >= 5){
              return (
                <div className='gun-element'>
                  <h5 className='gun-title' onClick={openModal}>{gunObject.fields.name}</h5>
              {isModalOpen && (
                <PopoutModal id={id} itemContent={gunObject} closeModal={closeModal} addToCart={addToCart} cartItem={cartItem} />
              )}
                  {/*<img src={gunObject.image} alt="Gun" className='gun-image' />*/}
                  <p className='gun-type'>Type: {gunObject.fields.type}</p>
                  <p className='gun-price'>Price: <span style={{ textDecoration: 'line-through' }}>${gunObject.fields.price}</span>${gunObject.fields.salePrice}</p>
              <br />
                  <p className='gun-description'>Description: {gunObject.fields.description}</p>
                  <br />
              <button className='BuyButton' onClick={() => addToCart(cartItem)}>Add to Cart</button>
                  <br />
                </div>);
                }
          else if(gunObject.fields.onSale === true && gunObject.fields.inStock >= 1){
                return (
                  <div className='gun-element'>
                    <h5 className='gun-title' onClick={openModal}>{gunObject.fields.name}</h5>
                {isModalOpen && (
                  <PopoutModal id={id} itemContent={gunObject} closeModal={closeModal} addToCart={addToCart} cartItem={cartItem} />
                )}
                    {/*<img src={gunObject.image} alt="Gun" className='gun-image' />*/}
                    <p className='gun-type'>Type: {gunObject.fields.type}</p>
                    <p className='gun-price'>Price: <span style={{ textDecoration: 'line-through' }}>${gunObject.fields.price}</span>${gunObject.fields.salePrice}</p>
                <br />
                    <p className='gun-description'>Description: {gunObject.fields.description}</p>
                    <br />
                    <p className='quantity-left'>Only {gunObject.fields.inStock} left in stock!</p>
                <button className='BuyButton' onClick={() => addToCart(cartItem)}>Add to Cart</button>
                    <br />
                  </div>);
                  }
  else {
    return (
        <div className='gun-element'>
          <h5 className='gun-title' onClick={openModal}>{gunObject.fields.name}</h5>
      {isModalOpen && (
        <PopoutModal id={id} itemContent={gunObject} closeModal={closeModal} addToCart={addToCart} cartItem={cartItem} />
      )}
          {/*<img src={gunObject.image} alt="Gun" className='gun-image' />*/}
          <p className='gun-type'>Type: {gunObject.fields.type}</p>
          <p className='gun-price'>Price: <span style={{ textDecoration: 'line-through' }}>${gunObject.fields.price}</span>${gunObject.fields.salePrice}</p>
      <br />
          <p className='gun-description'>Description: {gunObject.fields.description}</p>
          <br />
              <h5 style={{ fontStyle: 'italic', color: 'gray'}}>Out of Stock</h5>
          <br />
        </div>)
  }
}; 

export default GunElement;
