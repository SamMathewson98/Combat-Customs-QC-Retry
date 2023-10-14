import React, { useEffect, useState } from 'react';
import '../Components/OverallStyleSheet.css';
import { useAccountContext } from '../Components/AccountContext'; // Import the context
import Navi from '../Components/Navi';
import OrderComponent from '../Components/OrderComponent';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router';
import ServicesRequested from '../Components/ServicesRequested';
import { Link } from 'react-router-dom';

function Orders() {
  const { state } = useAccountContext(); // Use useContext to access the context state
  const { user } = state;
  const [ userData, setUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    newPassword: user.password,
    confirmNewPassword: user.password,
    orders: user.orders,
    services: user.services
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
  }, []);

  if (userData.orders.length == 0) {
    return (
      <div className='body'>
        <Navi />
        <div className='HomePage'>
          <h1>You have not placed any orders yet! We look forward to earning your business.</h1>
          <br />
          <h1 style={{ cursor: 'pointer'}} onClick={() => navigate("/Services")}>Check out all the great services Combat Customs has to offer</h1>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className='body'>
        <Navi />
        <div className='HomePage'>
          <h1>Services Requested: </h1>
        {userData.services.length > 0 ? (
              userData.services.map((service, index) => (
                <ServicesRequested key={index} service={service} />
              ))
            ) : (
              <p>You have not requested any services yet! Visit our <Link to="/Services">services page</Link> to see all the great things Combat Customs has to offer</p>
            )}
            <h1>Orders: </h1>
            {userData.orders.length > 0 ? (
              userData.orders.map((order, index) => (
                <OrderComponent key={index} order={order} />
              ))
            ) : (
              <p>You have not made any orders yet!</p>
            )}
        </div>
        <Footer />
    </div>
  )
}

export default Orders