import React, { useState, useEffect } from 'react';
import { useAccountContext } from './AccountContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OverallStyleSheet.css';

const Login = () => {
  const { dispatch } = useAccountContext();
  const { state } = useAccountContext();
  const { user } = state;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const setAuthToken = token => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
    delete axios.defaults.headers.common["Authorization"];
  }

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page
    try {
      const response = await axios.post('http://localhost:3002/api/login', { email, password });
      const token = response.data.token;
      const userData = response.data.user;
      const userId = userData.id;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      console.log('JWT Token: ', token);
      console.log("userId: ", userId);

      setAuthToken(token);

      // Store the token securely (e.g., using HTTP cookies)
      // Example using cookies (you need to implement this):
      // document.cookie = `authToken=${token}; Path=/; Secure; HttpOnly`;
      dispatch({ type: 'SET_USER', payload: userData });
      console.log(userData);

      // Redirect the user to a protected route or perform other actions
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLogout = () => {
    // Dispatch action to log out user
    dispatch({ type: 'LOGOUT' });
    // Clear the 'userId' and 'token' from localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/');
  };

  if (state.isAuthenticated) {
    const { user: userData } = state;
    return (
      <div className='userLoggedIn'>
        <h4>Welcome Back, {userData.firstName}</h4>
        <Link className='AccountLink' to="/Profile"><h5>Profile</h5></Link>
        <Link className='AccountLink' to="/Orders"><h5>Orders</h5></Link>
        {userData.isAdmin &&
        <Link className='AccountLink' to="/OwnersPortal"><h5>Owners Portal</h5></Link>
        }
        <button className='Logout' onClick={handleLogout}>Log Out</button>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-header">
      </div>
      <div className="login-form">
        <form className="ContactForm" onSubmit={handleLogin}>
          <label htmlFor='email'>Email Address</label>
          <input type="email" name='email' placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor='password'>Password</label>
          <input type="password" name='password' placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="login-button" style={{ cursor: 'pointer' }}>Login</button>
        </form>
      </div>
      <div className='AccountNeedsInfo'>
        <div className="forgot-password">
          <Link to="/ForgotPassword">Forgot Password?</Link>
        </div>
        <div className="register-now">
          <p>Don't have an account? <a href="/CreateAccount">Register Now</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

