import React, { useState, useEffect } from 'react'
import Navi from '../Components/Navi';
import GalleryComponent from '../Components/GalleryComponent';
import Footer from '../Components/Footer';
import axios from 'axios';
import '../Components/OverallStyleSheet.css';

function GalleryPage() {
    const [pictures, setPictures] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:3002/api/contentful/gallery')
        .then(response => {
          if (response.data.includes && response.data.includes.Asset) {
            setPictures(response.data.includes.Asset);
          }
        })
        .catch(error => {
          console.error('Error fetching data from backend:', error.message);
        });
    }, []);

      console.log(pictures);

  return (
    <div className='body'>
        <Navi />
        <div className='gallery-page HomePage'>
            <h1>View our gallery!</h1>
            <div className='gallery'>
            {pictures.length > 0 ? (
        pictures.map((picture) => (
          <GalleryComponent key={picture.sys.id} data={picture} />
        ))
      ) : (
        <p>Loading...</p>
      )}
      </div>
        </div>
        <Footer />
    </div>
  )
}

export default GalleryPage