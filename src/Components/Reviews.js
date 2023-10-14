// Reviews.js
import React from 'react';
import './OverallStyleSheet.css';

const Reviews = ({ reviews }) => {
  return (
    <div className='dropdown-content'>
      <ul>
    {reviews ? (
      reviews.map((review, index) => (
      <li key={index}>
          {review}
      </li>
      ))
  ) : (
      
      <li>No reviews available.</li>
      
  )} </ul>
  </div>
  )
};

export default Reviews;
