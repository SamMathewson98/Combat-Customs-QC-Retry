import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ServiceModal from './ServiceModal';
import WriteReview from './WriteReview.js';
import { useAccountContext } from './AccountContext';


const ServicesComponent = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const { state } = useAccountContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3002/api/services')
      .then(response => {
        setServices(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error.message);
      });
  }, []);

  const handleDropdownItemClick = (index) => {
    setSelectedService(index === selectedService ? null : index);
  };

  const handleReviewClick = () => {
    setReviewOpen((prevState) => !prevState);
  };
  

  const openModal = () => {
    setModalOpen((prevState) => {
      console.log('Popout Open: ' + !prevState);
      return !prevState;
    });};

    const closeModal = () => {
      setModalOpen(false);
      console.log('Popout Open: false');
    };

  return (
    <div className='services-component'>
      {services.map((service, index) => (
        <div
          key={index}
          className={`dropdown-item ${selectedService === index ? 'active' : ''}`}
          onClick={() => handleDropdownItemClick(index)}
        >
          <div className="dropdown-title">
            <h5>{service.name}</h5>
            <span className={`services-caret ${selectedService === index ? 'caret-up' : ''}`}></span>
          </div>
          {selectedService === index && (
            <div className="dropdown-content">
              <h2 className='request-service-button' onClick={(e) => { e.stopPropagation(); openModal(); }}>Request this service</h2>
              {isModalOpen && (
                <ServiceModal itemContent={service} closeModal={closeModal}/>
              )}
              <p>Price: ${service.priceRange}</p>

              {/*Review Dropdown Here*/}
              <div
              className='review-area'
              onClick={(e) => { e.stopPropagation(); handleReviewClick(); }}
              >
                <div className="dropdown-title">
                <h5>See reviews!</h5>
                <span className={`services-caret ${reviewOpen ? 'caret-up' : ''}`}></span>
              </div>              
              <div className={`review-content ${reviewOpen ? 'active' : ''}`} onClick={(e) => { e.stopPropagation() }}>
               {state.isAuthenticated ? (<WriteReview itemId={service._id} name={state.user.firstName}/>) : (<p>Login to leave a review!</p>)}
                <ul>
                {service.reviews && service.reviews.length > 0 ? (
                  service.reviews.map((review, index) => (
                    <li className='review' key={index}>
                      <p><span style={{fontWeight:'bold'}}>{review.name}:</span> "{review.text}"</p>
                    </li>
                  ))
                ) : (
                  <p>No reviews yet!</p>
                )}
               </ul>
               </div>
              </div>


              {/* Use dangerouslySetInnerHTML to render HTML content */}
              <div className='service-description' dangerouslySetInnerHTML={{ __html: service.richTextContent }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ServicesComponent;