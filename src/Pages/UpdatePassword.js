import React, { useState } from 'react'
import Navi from '../Components/Navi'
import { useNavigate } from 'react-router';
import Footer from '../Components/Footer';
import axios from 'axios';
import logo from '../Components/CC Logo.png';
import { useAccountContext } from '../Components/AccountContext';

function UpdatePassword() {
    const { state, updateUserData, dispatch } = useAccountContext(); // Use useContext to access the context state
    const { user } = state;
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        _id: state.user.id,
        password: '',
        confirmPassword: ''
    });

    console.log(state);
    const userId = localStorage.getItem('userId');
    console.log(userId);

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
          // Create the user object to send to the server
          setLoading(true);
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
            console.log('Account updated successfully!', updatedPassword._id);
            navigate('/Profile');
            setLoading(false);
          } else {
            console.error('Error updating password:', response.data.message);
          }
         } catch {
            console.error('Error updating password')
          }
    };

    if (loading) {
        return (
          <div style={{alignItems:'center'}}>
            <Navi />
                <h1>Sending Email...</h1>
                <img src={logo} className='loading' />
                <Footer />
              </div>
        );
      }
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

export default UpdatePassword