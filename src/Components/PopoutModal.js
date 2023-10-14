import React, { useState } from 'react';
import './OverallStyleSheet.css';
import Reviews from './Reviews';
import { useAccountContext } from './AccountContext';
import WriteReview from './WriteReview';

function PopoutModal({ id, itemContent, closeModal, addToCart, cartItem }) {
  const [viewReviews, setViewReviews] = useState(false);
  const { state } = useAccountContext();

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleDropdownItemClick = () => {
    setViewReviews(!viewReviews);
  };

  if(itemContent.fields.inStock >= 5){
  return (
    <div className="modal-container" onClick={handleOutsideClick}>
          <div className="modal">
            <div className='modal-item'>
            <span className="close-modal" onClick={closeModal}>
              X
            </span>
            {/* Content for displaying the item goes here */}
            <h1>{itemContent.fields.name}</h1>
            {/*<img src={itemContent.fields.image} />*/}
            <h5>Price: ${itemContent.fields.salePrice || itemContent.fields.price}</h5>
            <p>{itemContent.fields.description}</p>
            <br />
            <button className='modal-button' onClick={() => addToCart(cartItem)}>Add to Cart</button>
            </div>            
            {state.isAuthenticated ? ( 
            <div className='write-reviews'>
            <WriteReview itemId={itemContent.fields.id}/>
            </div>) :
            (
              <div className='write-reviews'>
                <p>Login or create an account to leave a review!</p>
                </div>
            )
            }
            <div className={`dropdown-item ${viewReviews ? 'active' : ''}`}
            onClick={() => handleDropdownItemClick()} ><p className='dropdown-title'>Reviews: <span className={`services-caret ${viewReviews ? 'caret-up' : ''}`}></span></p></div>
            {viewReviews && <Reviews reviews={itemContent.fields.reviews}/>}
          </div>
        </div>
  );
}
  else if(itemContent.fields.inStock >= 1){
    return (
      <div className="modal-container" onClick={handleOutsideClick}>
            <div className="modal">
            <div className='modal-item'>
              <span className="close-modal" onClick={closeModal}>
                X
              </span>
              {/* Content for displaying the item goes here */}
              <h1>{itemContent.fields.name}</h1>
              {/*<img src={itemContent.fields.image} />*/}
              <h5>Price: ${itemContent.fields.salePrice || itemContent.fields.price}</h5>
              <p>{itemContent.fields.description}</p>
              <br />
              <p className='quantity-left'>Only {itemContent.fields.inStock} left in stock!</p>
              <button className='modal-button' onClick={() => addToCart(cartItem)}>Add to Cart</button>
              <br />      
              </div>            
            {state.isAuthenticated ? ( 
            <div className='write-reviews'>
            <WriteReview itemId={itemContent.fields.id}/>
            </div>) :
            (
              <div className='write-reviews'>
                <p>Login or create an account to leave a review!</p>
                </div>
            )
            }
            <div className={`dropdown-item ${viewReviews ? 'active' : ''}`}
            onClick={() => handleDropdownItemClick()} ><p className='dropdown-title'>Reviews: <span className={`services-caret ${viewReviews ? 'caret-up' : ''}`}></span></p></div>
            {viewReviews && <Reviews reviews={itemContent.fields.reviews}/>}
            </div>
          </div>
    );  
}
else {
  return (
    <div className="modal-container" onClick={handleOutsideClick}>
          <div className="modal">
            <div className='modal-item'>
            <span className="close-modal" onClick={closeModal}>
              X
            </span>
            {/* Content for displaying the item goes here */}
            <h1>{itemContent.fields.name}</h1>
            {/*<img src={itemContent.fields.image} />*/}
            <h5>Price: ${itemContent.fields.salePrice || itemContent.fields.price}</h5>
            <p>{itemContent.fields.description}</p>
            <br />
            <p className='quantity-left'>Only {itemContent.fields.inStock} left in stock!</p>
              <h5 style={{ fontStyle: 'italic', color: 'gray'}}>Out of Stock</h5>
            <br />     
            </div>            
            {state.isAuthenticated ? ( 
            <div className='write-reviews'>
            <WriteReview itemId={itemContent.fields.id}/>
            </div>) :
            (
              <div className='write-reviews'>
                <p>Login or create an account to leave a review!</p>
                </div>
            )
            }
            <div className={`dropdown-item ${viewReviews ? 'active' : ''}`}
            onClick={() => handleDropdownItemClick()} ><p className='dropdown-title'>Reviews: <span className={`services-caret ${viewReviews ? 'caret-up' : ''}`}></span></p></div>
            {viewReviews && <Reviews reviews={itemContent.fields.reviews}/>}
          </div>
        </div>
  );  
}
}

export default PopoutModal;
