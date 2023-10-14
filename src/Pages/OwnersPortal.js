import React, { useEffect, useState } from 'react';
import '../Components/OverallStyleSheet.css';
import Navi from '../Components/Navi';
import OwnerServiceUpdate from '../Components/OwnerServiceUpdate';
import Footer from '../Components/Footer';
import OwnersOrdersComponent from '../Components/OwnersOrdersComponent';
import axios from 'axios';
import EditService from '../Components/EditService';
import OwnersServiceComponent from '../Components/OwnersServiceComponent';

function OwnersPortal() {
  const [orders, setOrders] = useState([]);
  const [services, setServices] = useState([]);
  const [requestedServices, setRequestedServices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/api/get-orders')
      .then(response => {
        setOrders(response.data);
        })
      .catch(error => {
        console.error('Error fetching data from backend:', error.message);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3002/api/get-requested-services')
      .then(response => {
        setRequestedServices(response.data);
        })
      .catch(error => {
        console.error('Error fetching data from backend:', error.message);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3002/api/services')
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error.message);
      });
  }, []);

  return (
    <div>
        <Navi />
        <div>
            <h1>Welcome to the Owners Portal</h1>
        </div>
        <div className='OwnersPortal'>
        <div className='OwnersOrders'>
          <h1>Services Requested</h1>
          {requestedServices.map((service,index)=>(
            <OwnersServiceComponent service={service} key={index} />
          ))}
          <h1>Orders</h1>
          {orders.map((order,index)=>(
            <OwnersOrdersComponent order={order} key={index} />
          ))}
        </div>
        <div className='OwnersServiceUpdate'>
          <h1>Select a Service: </h1>
          {services.length > 0 && (<EditService services={services} />)}
          <br />
          <h1>Or add a new service: </h1>
        <OwnerServiceUpdate />
        </div>
        </div>
        <Footer />
    </div>
  )
}

export default OwnersPortal
