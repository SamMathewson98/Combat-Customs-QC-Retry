import React, { useState } from 'react';
import './OverallStyleSheet.css';

function OrderComponent({ order, index }) {
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleDropdownItemClick = (index) => {
        setSelectedOrder(index === selectedOrder ? null : index);
      };

const datetimeStamp = order.date; // Replace this with your datetime stamp
const dateObject = new Date(datetimeStamp);

const year = dateObject.getFullYear();
const month = dateObject.getMonth() + 1; // Months are zero-based, so add 1
const day = dateObject.getDate();

const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;


  return (
    <div key={index} className='order-component' >
          <div className="order-title" onClick={() => handleDropdownItemClick(index)}>
            <h3>Order Date: {formattedDate}</h3>
            <span className={`services-caret ${selectedOrder === index ? 'caret-up' : ''}`}></span>
          </div>
          {selectedOrder === index && (
            <div className="dropdown-content">
              {order.order.map(( item, index) => (
                <div className="order" key={index}>
                <h4>{item.name}</h4>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                </div>
              ))}
            </div>
          )}
        </div>
  )
}

export default OrderComponent