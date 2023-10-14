import React, { useState } from 'react'
import Navi from '../Components/Navi'
import { useNavigate } from 'react-router';
import Footer from '../Components/Footer';
import logo from '../Components/CC Logo.png';
import { Link } from 'react-router-dom';


function ForgotPassword() {
    const [formData, setFormData] = useState({
        email: ''
    });
    const [loading, setLoading] = useState(false);
    const [requestSent, setRequestSent] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
        };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.email.length == 0){
            window.alert('Please enter an email')
        }

        try {
            setLoading(true);
            const response = await fetch('http://localhost:3002/forgot-password', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: formData.email }),
            });
      
            if (response.ok) {
              setLoading(false);
              setRequestSent(true);
              console.log('Email sent successfully!');
              return (
                navigate("/Submitted Successfully")
              )
            } else {
              console.error('Failed to send email.');
              // Handle error case
            }
          } catch (error) {
            console.error('Error sending email:', error);
          }
    }

    if (loading) {
        return (
          <div className="body" style={{alignItems:'center'}}>
            <Navi />
                <h1>Sending Email...</h1>
                <img src={logo} className='loading' />
                <Footer />
              </div>
        );
      }
      else if (requestSent) {
        return (    
            <div className="body" style={{alignItems:'center'}}>
            <Navi />
                <h1>Email sent!</h1>
                <Link to="/">Return to Home Page</Link>
                <img src={logo} className='loading' />
                <Footer />
              </div>
        )
      } else {
  return (
    <div className='body'>
        <Navi />
        <div className='HomePage'>
            <h1>Enter the email associated with your account</h1>
            <p>An email will be sent to your account email with a link to reset your password</p>
            <form className='ContactForm' onSubmit={handleSubmit}>
                <label htmlFor='email' className='FormElement'>Enter email: </label>
                <input type='email' className='FormElement' name='email' value={formData.email} onChange={handleChange} />
                <button type='submit' className='FormElement'>Send Email</button>
            </form>
        </div>
        <Footer />
    </div>
  )
}
}

export default ForgotPassword