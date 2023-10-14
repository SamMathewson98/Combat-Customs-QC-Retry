import React, { useState, useEffect } from 'react';
import './OverallStyleSheet.css';
import { useAccountContext } from './AccountContext';
import logo from './CC Logo.png';
import FirearmServiceDescriptions from './FirearmServiceDescriptions';
import axios from 'axios';

function ServiceModal({itemContent, closeModal}) {
    const [requestSent, setRequestSent] = useState(false);
    const [tabs, setTabs] = useState([]);
    const { state } = useAccountContext();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        _id: state.isAuthenticated ? state.user.id : '',
        name: state.isAuthenticated
          ? `${state.user.firstName} ${state.user.lastName}`
          : '',
        email: state.isAuthenticated ? state.user.email : '',
        phone: state.isAuthenticated ? state.user.phone : '',
        description: [],
        hasAccount: state.isAuthenticated,
        requestedService: `Service ID: ${itemContent._id}, Service Name: ${itemContent.name}, Price Range Quoted: $${itemContent.priceRange}`
      });

    const handleChange = (e) => {
        e.stopPropagation(); // Prevent event propagation
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleOutsideClick = (e) => {
        if (e.target.classList.contains('modal-container')) {
          closeModal();
        }
      };

      async function updateDescriptionFromTabs() {
          formData.description = tabs;
          console.log(formData);
          console.log(tabs);
      }

      /*const updateDescriptionFromTabs = () => {
        return new Promise((resolve, reject) => {
          try {
            setFormData((prevData) => ({
              ...prevData,
              description: [...tabs]
            }));
            console.log(tabs);      
            resolve(); // Resolve immediately if there are no asynchronous operations.
          } catch (error) {
            // If an error occurs, reject the Promise.
            reject(error);
          }
        });
      }; 
      */

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        try {
          setLoading(true);
          await updateDescriptionFromTabs();

          const servicePost = await axios.post('http://localhost:3002/api/service-request', { formData })
            if (servicePost.status === 201) {
              const requestedServiceID = servicePost.data.requestedServiceID
              console.log('Request saved to database. Service ID is: ', requestedServiceID);
              setFormData((prevData) => ({
                ...prevData,
                id: requestedServiceID
              }))
            }
            console.log(formData)
          const response = await fetch('http://localhost:3002/send-service-request', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            console.log('Email sent successfully!');
            setLoading(false);
            setRequestSent(true);
          } else {
            console.error('Failed to send email.');
            // Handle error case
          }
        } catch (error) {
          console.error('Error sending email:', error);
        }
      };

      if (loading) {
        return (
          <div className="modal-container">
            <div className="service-modal" onClick={(e) => e.stopPropagation()}>
              <div className="service-modal-item">
                <h1>Sending Email...</h1>
                <img src={logo} className='loading' />
              </div>
            </div>
          </div>
        );
      } else if (requestSent) {
        return (    
            <div className="modal-container" onClick={handleOutsideClick}>
            <div className="service-modal" onClick={(e) => e.stopPropagation()}>
              <div className='service-modal-item'>
              <span className="close-modal" onClick={closeModal}>
                X
              </span>
                <h1>Request Sent!</h1>
                <h3 onClick={closeModal}>Click here to view more services offered by Combat Customs</h3>
            </div>
            </div>
            </div>
        )
      } else {
  return (    
  <div className="modal-container" onClick={handleOutsideClick}>
  <div className="service-modal" onClick={(e) => e.stopPropagation()}>
    <div className='service-modal-item'>
    <span className="close-modal" onClick={closeModal}>
      X
    </span>
    {/* Content for displaying the item goes here */}
    <h1>{itemContent.name}</h1>
    {/*<img src={itemContent.fields.image} />*/}
    <h3>Price Range: ${itemContent.priceRange}</h3>
    <div dangerouslySetInnerHTML={{ __html: itemContent.richTextContent }} />
    </div>
    <div className='request-service'>
        <h1>Reach out to enhance your firearm!</h1>
        <form onSubmit={handleSubmit} className='ContactForm'>
        <label htmlFor="name" className='FormElement'>Enter Your Name:</label>
        <input type="text" name="name" className='FormElement' value={formData.name} onChange={handleChange} required />
        <label htmlFor="email" className='FormElement'>Enter Your Email:</label>
        <input type="email" name="email" className='FormElement' value={formData.email} onChange={handleChange} required />
        <label htmlFor="phone" className='FormElement'>Enter Your Phone Number:</label>
        <input type="tel" name="phone" className='FormElement' value={formData.phone} onChange={handleChange} />
        <FirearmServiceDescriptions tabs={tabs} setTabs={setTabs} updateDescription={updateDescriptionFromTabs} />
        <button type="submit" className='FormElement'>Submit</button>
      </form>
    </div>
    </div>
  </div>
  )
    }
}

export default ServiceModal