import React from 'react';
import '../Components/OverallStyleSheet.css';
import Navi from '../Components/Navi';
import Footer from '../Components/Footer';

function FFLTransfers() {
  return (
    <div className='body'>
        <Navi />
        <div className='ContactUs'>
        <div>
            <h1>Federal Firearms License (FFL) Transfers</h1>
        </div>
        <div>
            <p>For the low price of $25, Combat Customs will receive and transfer firearms that you purchase through a third party.  Combat Customs reserves the right to conduct background checks and applicable due diligence in accordance with Texas State Law when transferring firearms. Call (703) 474-5770 or email sammathewson98@gmail.com for more information or to schedule your firearm transfer</p>
        </div>
        <div className='not-local'>
          <h1>Not local? Follow these steps:</h1>
          <div className='three-sections'>
            <div>
              <h3>Step One</h3>
              <br />
              <p>Send us an email regarding your custom plan. Be as specific as possible and include any example photos if necessary. Please specify all parts you are sending. If item is disassembled, a packing list is required. Be specific on colors or pattern chosen. Reference pictures always help. If items are send from home please provide copy of drivers license (front and back).  If sent via FFL, please provide us with a copy of the FFL. sales@combatcustomstx.com</p>
            </div>
            <div>
              <h3>Step Two</h3>
              <br />
              <p>Send your items to: Combat Customs 32002 Anne Ln, Pinehurst, TX 77362</p>
            </div>
            <div>
              <h3>Step Three</h3>
              <br />
              <p>Once Items are received, an invoice will be created work will begin on your custom project. We will keep you updated every step of the way and upon completion of your order you will be contacted for payment. Once payment is received, your project will be shipped within one business day. </p>
            </div>
          </div>
        </div>
        </div>
        <Footer />
    </div>
  )
}

export default FFLTransfers