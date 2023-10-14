import React, { useState, useEffect } from 'react';
import AccessoriesElement from '../Components/AccessoriesElement';
import Navi from '../Components/Navi';
import axios from 'axios';
import Footer from '../Components/Footer';
import '../Components/OverallStyleSheet.css';

const AccessoriesPage = () => {
  const [accessoriesObjects, setAccessoriesObjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/api/contentful/accessories') // Update the endpoint
      .then(response => {
        setAccessoriesObjects(response.data);
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
      {accessoriesObjects.map((AccessoriesObject, index) => (
        <AccessoriesElement key={index} AccessoriesObject={AccessoriesObject} />
      ))}
      </div>
      <Footer />
    </div>
  );
};

export default AccessoriesPage;


