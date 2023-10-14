import React from 'react'
import '../Components/OverallStyleSheet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer'>
    <div className='HomePageText'>
        <p>This website is designed by Sam Mathewson and Tyler Hamid. Contents are exclusively owned by Combat Customs and Mathewson General Holdings, LLC. Reproduction and use are not authorized without the express written consent of Combat Customs and Mathewson General Holdings.</p>
      </div>
      <div className='threeColumns'>
        <div className='footerColumn One'>
            <Link to="/ContactUs" style={{ color: 'white'}}><p>Contact Us</p></Link>
            <Link to="/CreateAccount" style={{ color: 'white'}}><p>Create an Account</p></Link>
            <Link to="/FFL Transfers" style={{ color: 'white'}}><p>Transfer a Firearm</p></Link>
            <Link to="/Gallery" style={{ color: 'white'}}><p>View our Gallery</p></Link>
        </div>
        <div className='footerColumn Two'>
            <h2>Mailing Address</h2>
            <p>Combat Customs<br />
            5900 Balcones Drive<br />
            Suite 100 <br />
            Austin, TX 78731<br />
            United States</p>
        </div>
        <div className='footerColumn Three'>
            <h5>Follow us on social media!</h5>
            <br />
            <FontAwesomeIcon icon={faFacebook} className='social-icon'/>
            <FontAwesomeIcon icon={faInstagram} className='social-icon' />
            <FontAwesomeIcon icon={faTwitter} className='social-icon' />
            <FontAwesomeIcon icon={faLinkedin} className='social-icon' />
        </div>
      </div>
    </div>
  )
}

export default Footer