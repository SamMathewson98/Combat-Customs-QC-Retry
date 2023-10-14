import React from 'react'
import HowItWorksSlider from '../Components/HowItWorksSlider'
import Footer from '../Components/Footer'
import Navi from '../Components/Navi'

function HowItWorks() {
  return (
    <div className='body'>
        <Navi />
        <div className='HomePage'>
            <h1 style={{
                width: '100%', textAlign:'center'
            }}>Our Process</h1>
            <HowItWorksSlider />
        </div>
        <Footer />
    </div>
  )
}

export default HowItWorks