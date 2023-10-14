import React, { useState, useEffect } from 'react';
import GunElement from '../Components/GunElement';
import Navi from '../Components/Navi';
import axios from 'axios';
import Footer from '../Components/Footer';
import { useParams } from 'react-router-dom';
import '../Components/OverallStyleSheet.css';

const GunList = () => {
  const [gunObjects, setGunObjects] = useState([]);
  const { urlID } = useParams();

     useEffect(() => {
      axios.get('http://localhost:3002/api/contentful/firearms')
      .then(response => {
        setGunObjects(response.data);
        console.log(gunObjects);
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error.message);
      });
    }, [])

  return (
    <div className='body'>
      <Navi />
      <div className="GunList">
      {gunObjects.map((gunObject) => (
        <GunElement key={gunObject.id} gunObject={gunObject} id={urlID} />
      ))}
      </div>
      <Footer />
    </div>
  );
};

export default GunList;


