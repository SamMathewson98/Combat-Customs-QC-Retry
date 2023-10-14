import React, { useState, useEffect } from 'react';
import PartElement from '../Components/PartElement';
import Navi from '../Components/Navi';
import axios from 'axios';
import Footer from '../Components/Footer';
import '../Components/OverallStyleSheet.css';

const PartsPage = () => {
  const [partsObjects, setPartsObjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/api/contentful/parts') // Update the endpoint
      .then(response => {
        setPartsObjects(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error.message);
      });
  }, []);

  return (
    <div className='body'>
      <Navi />
      <div className="GunList">
      {partsObjects.map((partObject, index) => (
        <PartElement key={index} partObject={partObject} />
      ))}
      </div>
      <Footer />
    </div>
  );
};

export default PartsPage;


