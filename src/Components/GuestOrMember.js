import React, { useState } from 'react';
import './OverallStyleSheet.css';
import Login from './Login';
import { Link } from 'react-router-dom';

function GuestOrMember({ closeModal }) {
    const [isAccountOpen, setIsAccountOpen] = useState(false); // State to track account visibility

    const handleAccountIconClick = () => {
      console.log('Account is open: ', isAccountOpen);
      setIsAccountOpen(!isAccountOpen); // Toggle the account visibility state
    };

    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      };

  return (
    <div className='modal-container' onClick={handleOutsideClick}>
        <div className='checkout-modal'>
        <span className="close-modal" onClick={closeModal}>
                X
              </span>
            <div className='choose-checkout'>
            <button className='FormElement' onClick={handleAccountIconClick}>Login or Create an Account</button>
                {isAccountOpen && (
                <div className='account-content'>
                <Login /> 
                </div>)}
            <Link to="/GuestCheckout"><button className='FormElement'>Checkout as Guest</button></Link>
            </div>
        </div>
    </div>
  )
}

export default GuestOrMember