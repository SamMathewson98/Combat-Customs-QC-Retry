import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navi from '../Components/Navi';
import '../Components/OverallStyleSheet.css';
import axios from 'axios';
import Footer from '../Components/Footer';
import { state, useAccountContext } from '../Components/AccountContext';

function CreateLogin({ onLogin }) {
  const { state, dispatch } = useAccountContext();
  const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      const navigate = useNavigate();

      const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevUserData) => ({
          ...prevUserData,
          [name]: value,
        }));
      };
      

      const handleSubmit = async (event) => {
        event.preventDefault();
      
        if (userData.password !== userData.confirmPassword) {
          console.log("Passwords don't match.");
          return;
        }
      
        try {
          // Create the user object to send to the server
          const newUser = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone,
            email: userData.email,
            password: userData.password,
          };
      
          // Send the new user data to the server
          const response = await axios.post('http://localhost:3002/api/create-account', newUser);
      
          if (response.status === 201) {
            console.log('Account created successfully!', newUser);
            // Call the onLogin function to update authentication status
            onLogin();
            dispatch({ type: 'SET_USER', payload: userData });
            const token = response.data.token;
            localStorage.setItem("token", token);
            const userId = response.data.userId;
            localStorage.setItem("userId", userId)

            const emailResponse = await axios.post('http://localhost:3002/new-account-email', newUser);
            if(emailResponse.status === 201){
              console.log('Account creation email sent!')
            } else {
              console.error('Error sending account creation email: ', emailResponse.data.message);
            }      
            // Redirect to the home page
            navigate('/'); // Make sure to import `useHistory` from 'react-router-dom'
          } else {
            console.error('Error creating account:', response.data.message);
          }
        } catch (error) {
          console.error('Error creating account:', error);
        }
      };
      


  return (
    <div className='body'>
        <Navi />
        <div>
      <form onSubmit={handleSubmit} className='ContactForm'>
              <label htmlFor="firstName" className='FormElement'>First Name:</label>
              <input type="text" name="firstName" className='FormElement' value={userData.firstName} onChange={handleChange} required />
              <label htmlFor="lastName" className='FormElement'>Last Name:</label>
              <input type="text" name="lastName" className='FormElement' value={userData.lastName} onChange={handleChange} required />
              <label htmlFor="email" className='FormElement'>Email:</label>
              <input type="email" name="email" className='FormElement' value={userData.email} onChange={handleChange} required />
              <label htmlFor="phone" className='FormElement'>Phone Number:</label>
              <input type="tel" name="phone" className='FormElement' value={userData.phone} onChange={handleChange} />
              <label htmlFor="password" className='FormElement'>Password:</label>
              <input type="password" name="password" className='FormElement' value={userData.password} onChange={handleChange} required />
              <label htmlFor="confirmPassword" className='FormElement'>Confirm Password:</label>
              <input type="password" name="confirmPassword" className='FormElement' value={userData.confirmPassword} onChange={handleChange} required />
              <button type="submit" className='FormElement'>Create Account</button>
            </form>
        </div>
        <Footer />
    </div>
  )
}

export default CreateLogin