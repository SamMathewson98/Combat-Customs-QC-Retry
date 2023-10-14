import React from 'react';
import './OverallStyleSheet.css';
import Navi from './Navi';
import { Link } from 'react-router-dom';
import Footer from './Footer';


function SubmittedSuccessfully() {
  return (
    <div>
        <Navi />
        <div className='submitted-successfully'>
            <h1 className='success-message text-mounting'>Your request has been submitted successfully!</h1>
            <br />
            <h3><Link to="/">Return to Home</Link></h3>
        </div>
        <Footer />
    </div>
  )
}

export default SubmittedSuccessfully