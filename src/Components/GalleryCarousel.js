import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './FeaturedCarousel.css';
import { Link } from 'react-router-dom';

const GalleryCarousel = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, 
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <Slider {...settings} className='featured-carousel'>
      {data.map((item, index) => (
        <div key={index} className='featured-slide'>
          <Link to="/Gallery"><img src={item.fields.file.url} alt={item.fields.title} className='carousel-photo' /></Link>
          <h2>{item.fields.title}</h2>
        </div>
      ))}
    </Slider>
  );
};

export default GalleryCarousel;