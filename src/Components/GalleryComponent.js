import React, { useState } from 'react';
import './OverallStyleSheet.css';
import GalleryPopout from './GalleryPopout';

function GalleryComponent({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen((prevState) => {
      console.log('Popout Open: ' + !prevState);
      return !prevState;
    });};

    const closeModal = () => {
      setIsModalOpen(false);
      console.log('Popout Open: false');
    };

  return (
    <div className='picture-box'>
        <img src={data.fields.file.url} alt={data.fields.title} className='gallery-photo'  onClick={openModal} />
        {isModalOpen && (
          <GalleryPopout data={data} closeModal={closeModal} />
        )}
        <h3 className='gallery-title'>{data.fields.title}</h3>
    </div>
  )
}

export default GalleryComponent