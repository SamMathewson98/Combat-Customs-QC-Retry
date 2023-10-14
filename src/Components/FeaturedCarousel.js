import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './FeaturedCarousel.css';
import { useNavigate } from 'react-router';

const FeaturedCarousel = ({ data }) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  const navigate = useNavigate();
 
  return (
    <Slider {...settings} className='featured-carousel'>
        {data.map((item, index) => (
          <div key={index} className='featured-slide'>
            {/* Use the onLoad event to track when the image has loaded */}
            <img
              src={item.fields.url}
              alt={item.fields.title}
              className='carousel-photo'
            />
            <h2>{item.fields.title}</h2>
            <p>{item.fields.description}</p>
            <Link to={item.fields.link}><button className='featured-button'>{item.fields.action}</button></Link>
          </div>
        ))}
    </Slider>
  );  
};

export default FeaturedCarousel;