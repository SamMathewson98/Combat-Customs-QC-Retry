import React, { useState, useEffect } from 'react'
import Navi from '../Components/Navi'
import { useNavigate } from 'react-router';
import Footer from '../Components/Footer';
import axios from 'axios';
import logo from '../Components/CC Logo.png';

function ResetPassword() {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        
        if (token) {
          // Push the token to local storage
          localStorage.setItem('token', token);
        }
      }, []);

    const navigate = useNavigate();

    const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        if (formData.password !== formData.confirmPassword) {
          window.alert("Passwords don't match.");
          return;
        }
      
        try {
          const updatedPassword = {
            password: formData.password
            }
      
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
          const response = await axios.post('http://localhost:3002/api/update-password', updatedPassword, { headers });
      
          if (response.status === 201 || response.status === 200) {
            console.log('Account updated successfully!');
            navigate('/');
          } else {
            console.error('Error updating password:', response.data.message);
          }
         } catch {
            console.error('Error updating password')
          }
    };

  return (
    <div className='body'>
        <Navi />
        <div className='HomePage'>
            <h1>Update your password</h1>
            <form className='ContactForm' onSubmit={handleSubmit}>
                <label htmlFor='password' className='FormElement'>Enter your new password: </label>
                <input type='password' name='password' className='FormElement' value={formData.password} onChange={handleChange} />
                <label htmlFor='confirmPassword' className='FormElement'>Confirm your new password: </label>
                <input type='password' name='confirmPassword' className='FormElement' value={formData.confirmPassword} onChange={handleChange} />
                <button type='submit' className='FormElement'>Submit password change</button>
            </form>
        </div>
        <Footer />
    </div>
  )
}

export default ResetPassword