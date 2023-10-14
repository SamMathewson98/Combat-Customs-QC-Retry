import React, { useState, useEffect } from 'react';
import GunShop from '../Components/gunShop';
import FeaturedCarousel from '../Components/FeaturedCarousel';
import GunCarousel from '../Components/GunCarousel';
import ServiceOptions from '../Components/ServiceOptions';
import { Link } from 'react-router-dom';
import FeaturedItems from '../Objects/FeaturedItems.json';
import Navi from '../Components/Navi';
import Footer from '../Components/Footer';
import axios from 'axios';
import GalleryCarousel from '../Components/GalleryCarousel';

function HomePage() {
  const [gunObjects, setGunObjects] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [featured, setFeatured]  = useState([]);
  const [featuredData, setFeaturedData] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);


  useEffect(() => {
    axios.get('http://localhost:3002/api/contentful/firearms')
    .then(response => {
      setGunObjects(response.data);
    })
    .catch(error => {
      console.error('Error fetching data from backend:', error.message);
    });
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3002/api/contentful/gallery')
      .then(response => {
        if (response.data.includes && response.data.includes.Asset) {
          setGallery(response.data.includes.Asset);
        }
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error.message);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3002/api/contentful/featured')
      .then(response => {
        if (response.data.includes && response.data.includes.Asset) {
          setFeatured(response.data.includes.Asset);
          setFeaturedData(response.data.items);
        }
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error.message);
      });
  }, []);

  const finalArray = featuredData.map((item, index) => ({
    ...item,
    fields: {
      ...item.fields,
      url: featured[index].fields.file.url
    }
  }));

  useEffect(() =>{
    if (finalArray.length >= 3){
      setImagesLoaded(true);
    }
  },[finalArray]);

  return (
    <div className='body'>
      <div>
        <Navi style={{ zIndex: 1 }}/>
      </div>
      <div className='HomePage'>
      <div style={{ marginBottom: '60px' }} className='carousel'>
      <div className='carousel-header'>
        <GunShop />
        </div>
        {imagesLoaded ? (
        <FeaturedCarousel data={finalArray} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div style={{ marginBottom: '20px'}} className='carousel'>
      <div className='carousel-header'>
        <Link to="/Gallery"><h1>Check out our gallery to see the work we take pride in</h1></Link>
        </div>
        {gallery.length > 0 ? (
        <GalleryCarousel data={gallery} />
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Middle section: ServiceOptions */}
      <div style={{ marginBottom: '40px', paddingTop: '10px' }} className='carousel'>
        <ServiceOptions />
      </div>

      {/* Bottom section: GunCarousel and Shop All Guns Link */}
      <div style={{ marginBottom: '20px' }} className='carousel'>
      <div className='carousel-header'>
        <Link to="/GunList"><h1>Shop All Guns</h1></Link>
      </div>
        {gunObjects.length > 0 ? (<GunCarousel data={gunObjects} />)
        :(
          <p>Loading...</p>
        )}
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
