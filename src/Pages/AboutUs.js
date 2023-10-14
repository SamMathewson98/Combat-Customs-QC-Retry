import React from 'react';
import Navi from '../Components/Navi';
import Footer from '../Components/Footer';
import '../Components/OverallStyleSheet.css'

function AboutUs() {
  return (
    <div className='body'>
        <div>
            <Navi />
        </div>
        <div className='AboutUsText'>
            <h1>About Combat Customs</h1>
            <br />
            <h3>Bottom Line Up Front:</h3>
            <p>We are Combat Customs. Our mission is to deliver unique, functional and quality paint solutions for firearms and firearms accessories. <br /><br />
            We are a small, veteran-owned business from the Northwest Houston area licensed to manufacture and deal firearms and ammunition. We specialize in custom firearm paint solutions. We are Type 7 FFL certified and are working to obtain our SOT for suppressors, machine guns, SBRs, etc.<br /><br />
            Combat Customs was founded on one simple tenet: responsible gun-owners shouldn't have to break the bank to customize their firearms. Whether you're searching for a functional camouflage pattern to use in the field or a color scheme to match your personal style, you'll find the perfect solution for every piece in your collection with Combat Customs. </p>
            <br />
            <h3>Hours of Operation</h3>
            <p>You can find us at 5900 Balcones Drive Suite 100, Austin, Texas 78731.</p>
            <p>We are open: </p>
            <ul>
              <li>Monday to Friday, 1pm to 7pm</li>
              <li>Saturday, 11am to 6pm</li>
              <li>Sunday: Closed</li>
            </ul>
            <br />
            <h3>Our Customer Satisfaction Guarantee</h3>
            <p>Combat Customs prides itself with creating exclusive, one-of-a-kind firearm paint solutions. Each application is created one at a time, by hand, ensuring that no two works of art will ever be the same. Like a fingerprint, each custom paint solution is unique to its owner and can be admired for years to come.</p>
        </div>
        <Footer />
    </div>
  )
}

export default AboutUs