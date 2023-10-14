import React, { useState } from 'react';
import './OverallStyleSheet.css';

function GalleryPopout({ data, closeModal }) {

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="modal-container" onClick={handleOutsideClick}>
          <div className="modal">
            <div className='modal-item'>
            <span className="close-modal" onClick={closeModal}>
              X
            </span>
            <img src={data.fields.file.url} alt={data.fields.title} className='modal-photo' />
            <h3>{data.fields.title}</h3>
            <p>{data.fields.description}</p>
            </div>
          </div>
        </div>
  );
}

export default GalleryPopout;

