import React, { useEffect, useState } from 'react';
import '../Components/OverallStyleSheet.css';
import { useAccountContext } from '../Components/AccountContext'; // Import the context
import Navi from '../Components/Navi';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';

function ProfilePage() {
  const { state, updateUserData, dispatch } = useAccountContext(); // Use useContext to access the context state
  const { user } = state;
  const [isLoading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    _id: user?.id || '', // Use default value or user.id if available
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    newPassword: '',
    confirmNewPassword: '',
    address: {
      street1: user?.address.street1 || '',
      street2: user?.address.street2 || '',
      city: user?.address.city || '',
      state: user?.address.state || '',
      zip: user?.address.zip || '',
      country: user?.address.country || '',
    }
  });

  const navigate = useNavigate();

   // useEffect to check for JWT in localStorage
   useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      console.log('Fetched Token: ', token);
      // You can add logic here to validate the token on the server-side if needed
      // If the token is valid, set isAuthenticated to true and refresh userData
      // For simplicity, we assume the token is valid for this example
      const fetchUserData = async () => {
        try {
          const userId = localStorage.getItem("userId");

          const headers = {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
          };
  
          // Make an API call to fetch the user data
          const userDataResponse = await axios.get(`http://localhost:3002/api/get-user-data/${userId}`, { headers });
  
          if (userDataResponse.status === 200) {
            const updatedUserData = userDataResponse.data.user;
            console.log(updatedUserData)
            dispatch({ type: 'SET_USER', payload: updatedUserData });
            setUserData(updatedUserData);
            setLoading(false);
          } else {
            console.error('Error fetching user data:', userDataResponse.data.message);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      // Call the fetchUserData function when the component mounts
      fetchUserData();
    }
  }, []); // Empty dependency array, runs once on component mount

    const handleChange = (e) => {
    const { name, value } = e.target;

    // To handle nested address object properties
    if (name.includes('address.')) {
      const addressField = name.split('.')[1];
      setUserData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (userData.newPassword !== userData.confirmNewPassword) {
      console.log("Passwords don't match.");
      return;
    }
  
    try {
      // Create the user object to send to the server
      const updatedUser = {
        _id: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        email: userData.email,
        password: userData.newPassword,
        address: {
          street1: userData.address.street1,
          street2: userData.address.street2,
          city: userData.address.city,
          state: userData.address.state,
          zip: userData.address.zip,
          country: userData.address.country,
        },
      };
  
      const token = localStorage.getItem("token");
  
      if (token) {
        // Set the Authorization header with the token
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
  
      const headers = {
        'Authorization': `${token}`,
        'Content-Type': 'application/json',
      };
  
      // Send the new user data to the server to update the account
      const response = await axios.post('http://localhost:3002/api/update-account', updatedUser, { headers });
  
      if (response.status === 201 || response.status === 200) {
        console.log('Account updated successfully!', updatedUser);
        navigate('/');
      } else {
        console.error('Error updating account:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };  

  return (
    <div className='body'>
      <Navi />
      {isLoading ? (
        // Render a loading indicator while data is being fetched
        <div>Loading...</div>
      ) : (
      <div className='profile-page'>
        <Link to="/Orders"><h3>View Your Orders &gt;&gt;</h3></Link>
        <form onSubmit={handleSubmit} className='ContactForm'>
          <p>First Name: {userData.firstName}</p><label htmlFor="firstName" className='FormElement'>First Name:</label>
            <input type="text" name="firstName" className='FormElement' value={userData.firstName} onChange={handleChange} />
          <p>Last Name: {userData.lastName}</p><label htmlFor="lastName" className='FormElement'>Last Name:</label>
            <input type="text" name="lastName" className='FormElement' value={userData.lastName} onChange={handleChange} />
          <p>Email: {userData.email}</p><label htmlFor="email" className='FormElement'>Email:</label>
            <input type="email" name="email" className='FormElement' value={userData.email} onChange={handleChange} />
            <p>Phone Number: {userData.phone}</p><label htmlFor="phone" className='FormElement'>Phone Number:</label>
            <input type="tel" name="phone" className='FormElement' value={userData.phone} onChange={handleChange} />
            <p>Address Line 1: {userData.address.street1 || ''}</p><label htmlFor="street1" className='FormElement'>New Address Line 1: </label>
            <input type="text" name="address.street1" className='FormElement' value={userData.address.street1} onChange={handleChange} />
            <p>Address Line 2: {userData.address.street2}</p><label htmlFor="street2" className='FormElement'>New Address Line 2:</label>
            <input type="text" name="address.street2" className='FormElement' value={userData.address.street2} onChange={handleChange} />
            <p>City: {userData.address.city}</p><label htmlFor="city" className='FormElement'>New City:</label>
            <input type="text" name="address.city" className='FormElement' value={userData.address.city} onChange={handleChange} />
            <p>State: {userData.address.state}</p><label htmlFor="state" className='FormElement'>New State:</label>
            <input type="text" name="address.state" className='FormElement' value={userData.address.state} onChange={handleChange} />
            <p>Zip Code: {userData.address.zip}</p><label htmlFor="zip" className='FormElement'>New Zip Code:</label>
            <input type="text" name="address.zip" className='FormElement' value={userData.address.zip} onChange={handleChange} />
            <p>Country: {userData.address.country}</p><label htmlFor="country" className='FormElement'>New Country:</label>
            <input type="text" name="address.country" className='FormElement' value={userData.address.country} onChange={handleChange} />
            <button type="submit" className='FormElement'>Update Account Information</button>         
        </form>
        <Link to="/UpdatePassword"><button className='FormElement'>Update your password</button></Link>
        </div> )}
        <Footer />
    </div>
  );
}

export default ProfilePage;

