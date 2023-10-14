import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './FeaturedCarousel.css';
import { Link } from 'react-router-dom';

const GunCarousel = ({ data }) => {

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
            <div className='featured-slide' key={index}>
              <img src={item.fields.image} alt={item.fields.name} />
              <Link to={`/GunList/${item.fields.id}`}><h3>{item.fields.name}</h3></Link>
              <h5>${item.fields.salePrice || item.fields.price}</h5>
            </div>
          ))}
      </Slider>
    );
};


export default GunCarousel;
