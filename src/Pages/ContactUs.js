import React, { useState } from 'react';
import Navi from '../Components/Navi';
import '../Components/OverallStyleSheet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import { useAccountContext } from '../Components/AccountContext';
import logo from '../Components/CC Logo.png';

const ContactForm = () => {
  const [requestSent, setRequestSent] = useState(false);
  const { state } = useAccountContext();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
      name: state.isAuthenticated
        ? `${state.user.firstName} ${state.user.lastName}`
        : '',
      email: state.isAuthenticated ? state.user.email : '',
      phone: state.isAuthenticated ? state.user.phone : '',
      description: '',
      hasAccount: state.isAuthenticated,
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch('http://localhost:3002/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setLoading(false);
        setRequestSent(true);
        console.log('Email sent successfully!');
        return (
          Navigate("/Submitted Successfully")
        )
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
      <div style={{alignItems:'center'}}>
        <Navi />
            <h1>Sending Email...</h1>
            <img src={logo} className='loading' />
            <Footer />
          </div>
    );
  } else { return (
    <div className='body'>
        <Navi />
    <div className='ContactUs'>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className='ContactForm'>
        <label htmlFor="name" className='FormElement'>Name:</label>
        <input type="text" name="name" className='FormElement' value={formData.name} onChange={handleChange} required />
        <label htmlFor="email" className='FormElement'>Email:</label>
        <input type="email" name="email" className='FormElement' value={formData.email} onChange={handleChange} required />
        <label htmlFor="phone" className='FormElement'>Phone Number:</label>
        <input type="tel" name="phone" className='FormElement' value={formData.phone} onChange={handleChange} />
        <label htmlFor="description" className='FormElement'>Send us a message:</label>
        <textarea id="description" className='FormElement' name="description" rows="4" cols="50" value={formData.description} onChange={handleChange} required></textarea><br />
        <button type="submit" className='FormElement'>Submit</button>
      </form>
      <div className='Connect'>
      <div className='mailing-address'>
      <h2>Mailing Address</h2>
      <p>Combat Customs<br />
            5900 Balcones Drive<br />
            Suite 100 <br />
            Austin, TX 78731<br />
            United States</p>
    </div>
    <div className='connect-with-us'>
    <h2>Connect with Us</h2>
    <div className='socials'>
    <FontAwesomeIcon icon={faFacebook} className='social-icon'/>
    <FontAwesomeIcon icon={faInstagram} className='social-icon' />
    <FontAwesomeIcon icon={faTwitter} className='social-icon' />
    <FontAwesomeIcon icon={faLinkedin} className='social-icon' />
    </div>
    </div>
    </div>
    </div>
    <Footer />
    </div>
  );
  };
};

export default ContactForm;
