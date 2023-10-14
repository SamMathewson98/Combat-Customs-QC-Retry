import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './FeaturedCarousel.css';

const HowItWorksSlider = () => {

  const howItWorks = [
    {
    "step": "Step One",
    "text": "Send us an email regarding your custom plan. Be as specific as possible and include any example photos if necessary. Please specify all parts you are sending. If item is disassembled, a packing list is required. Be specific on colors or pattern chosen. Reference pictures always help. If items are sent from home please provide copy of drivers license (front and back). If sent via FFL, please provide us with a copy of the FFL."
},
    {
    "step": "Step Two",
    "text": "Send your items to: Combat Customs; 32002 Anne Ln. Pinehurst, TX 77362"
    },
    {
    "step": "Step Three",
    "text": "Once Items are received, an invoice will be created work will begin on your custom project. We will keep you updated every step of the way and upon completion of your order you will be contacted for payment. Once payment is received, your project will be shipped within one business day. "
    }
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 10000
  };

  return (
    <Slider {...settings} className='featured-carousel'>
        {howItWorks.map((item, index) => (
          <div key={index} className='featured-slide'>
            {/* Use the onLoad event to track when the image has loaded */}
            {/*<img
              src={item.fields.url}
              alt={item.fields.title}
              className='carousel-photo'
        />*/}
            <h2>{item.step}</h2>
            <p>{item.text}</p>
          </div>
        ))}
    </Slider>
  );  
};

export default HowItWorksSlider;