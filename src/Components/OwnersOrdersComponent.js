import React, { useState } from 'react';
import './OverallStyleSheet.css';

function OwnersOrdersComponent({ order, index }) {
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

// Function to calculate total price
const calculateTotalPrice = (order) => {
    var totalPrice =
      order.orderContent.reduce((acc, item) => acc + item.price * item.quantity, 0)
      totalPrice = totalPrice.toFixed(2);
    return totalPrice;
  };

  return (
    <div key={index} className='order-component' >
          <div className="order-title" onClick={() => handleDropdownItemClick(index)}>
            <h3>Order Date: {formattedDate}</h3>
            <p>Order ID: {order.orderID} Customer: {order.email} Contact Number: {order.phone}</p>
            <br />
            <p>Total Price: ${calculateTotalPrice(order)}</p>
            <span className={`services-caret ${selectedOrder === index ? 'caret-up' : ''}`}></span>
          </div>
          {selectedOrder === index && (
            <div className="dropdown-content">
              {order.orderContent.map(( item, index) => (
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

export default OwnersOrdersComponent