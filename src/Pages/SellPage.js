import React from 'react';
import '../Components/OverallStyleSheet.css';
import Navi from '../Components/Navi';
import Footer from '../Components/Footer';

function SellPage() {
  return (
    <div className='body'>
        <Navi />
        <div className='ContactUs'>
        <div>
            <h1>Looking to sell your firearm or firearm parts?</h1>
        </div>
        <div>
            <p>Combat Customs will buy used fireams and firearm parts or accessories in good condition.  Combat Customs reserves the right to conduct background checks and applicable due diligence in accordance with Texas State Law when transferring firearms. Call (703) 474-5770 or email sammathewson98@gmail.com for more information or to schedule your firearm transfer</p>
        </div>
        </div>
        <Footer />
    </div>
  )
}

export default SellPage;