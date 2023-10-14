import React, { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css'; // Import Draft.js styles
import { stateToHTML } from 'draft-js-export-html';
import axios from 'axios';
import HTMLPlaceholder from './HTMLPlaceholder'; // Import your custom placeholder component
import EditServiceSingleComponent from './EditServiceSingleComponent';

const EditService = ({ services }) => {

  return (
    <div className='services-component'>
      {services.map((service, index) => (
        <EditServiceSingleComponent data={service} index={index} key={index} />
      ))}
    </div>
  );
};

export default EditService;