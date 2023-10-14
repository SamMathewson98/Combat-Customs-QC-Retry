import React, { useState } from 'react';
import './OverallStyleSheet.css';

function OwnersServiceComponent({ service, index }) {
    const [selectedService, setSelectedService] = useState(null);

    const handleDropdownItemClick = (index) => {
        setSelectedService(index === selectedService ? null : index);
      };

const datetimeStamp = service.requestDate; // Replace this with your datetime stamp
const dateObject = new Date(datetimeStamp);

const year = dateObject.getFullYear();
const month = dateObject.getMonth() + 1; // Months are zero-based, so add 1
const day = dateObject.getDate();

const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  return (
    <div key={index} className='order-component' >
          <div className="order-title" onClick={() => handleDropdownItemClick(index)}>
            <h3>Service Date: {formattedDate}</h3>
            <p>Requested Service: {service.requestedService}</p>
            <p>Confirmation Number: {service._id} Customer: {service.email} Contact Number: {service.phone}</p>
            <br />
            <span className={`services-caret ${selectedService === index ? 'caret-up' : ''}`}></span>
          </div>
          {selectedService === index && (
            <div className="dropdown-content">
              {service.description.map(( item, index) => (
                <div className="order" key={index}>
                <h4>Brand: {item.brand}</h4>
                <h4>Model: {item.model}</h4>
                <p>Description: {item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
  )
}

export default OwnersServiceComponent