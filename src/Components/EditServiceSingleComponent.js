import React, { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils, ContentState, convertFromHTML, Modifier, SelectionState } from 'draft-js';
import 'draft-js/dist/Draft.css'; // Import Draft.js styles
import { stateToHTML } from 'draft-js-export-html';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HTMLPlaceholder from './HTMLPlaceholder'; // Import your custom placeholder component
import e from 'cors';

function EditServiceSingleComponent({ data, index }) {
  const [selectedService, setSelectedService] = useState(false);
  const [updatedService, setUpdatedService] = useState({
    _id: data?._id,
    name: '',
    priceRange: '',
  });
  const [isSaved, setIsSaved] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const navigate = useNavigate();

  useEffect(() => {
    setHtmlContent(data?.richTextContent || '');

    const blocksFromHTML = convertFromHTML(htmlContent);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );

    const newEditorState = EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
  }, [data]);

  const handleDropdownItemClick = () => {
    setSelectedService(!selectedService);
  };

  const handleKeyCommand = (command) => {
    if (selectedService !== null) {
      const newState = RichUtils.handleKeyCommand(editorState, command);

      if (newState) {
        setEditorState(newState);
        return 'handled';
      }
    }
    return 'not-handled';
  };

  const toggleInlineStyle = (style) => {
    if (selectedService !== null) {
      const newEditorState = RichUtils.toggleInlineStyle(editorState, style);
      setEditorState(newEditorState);
    }
  };

  const toggleTextColor = (color) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const inlineStyle = editorState.getCurrentInlineStyle();
    const newContentState = Modifier.applyInlineStyle(contentState, selectionState, `COLOR-${color}`);
    const newState = EditorState.push(editorState, newContentState, 'change-inline-style');
    setEditorState(newState);
  };
  
  const toggleTextHighlight = (color) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const inlineStyle = editorState.getCurrentInlineStyle();
    const newContentState = Modifier.applyInlineStyle(contentState, selectionState, `BACKGROUND-COLOR-${color}`);
    const newState = EditorState.push(editorState, newContentState, 'change-inline-style');
    setEditorState(newState);
  };
  
  const toggleFontSize = (fontSize) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const newContentState = Modifier.setInlineStyle(contentState, selectionState, { fontSize });
    const newState = EditorState.push(editorState, newContentState, 'change-inline-style');
    setEditorState(newState);
  };
  
  const toggleFontFamily = (fontFamily) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const newContentState = Modifier.setInlineStyle(contentState, selectionState, { fontFamily });
    const newState = EditorState.push(editorState, newContentState, 'change-inline-style');
    setEditorState(newState);
  };

  const insertLink = () => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: 'https://example.com' });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    const newState = RichUtils.toggleLink(newEditorState, selectionState, entityKey);
    setEditorState(newState);
  };

  const toggleBlockType = (newBlockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, newBlockType));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedService((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReturnToPortal = (event) => {
    event.preventDefault();
    setIsSaved(false);

    // Refresh the page
    window.location.reload();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const serviceUpdate = {
      _id: data?._id,
      name: updatedService.name || data?.name,
      priceRange: updatedService.priceRange || data?.priceRange,
      richTextContent: stateToHTML(editorState.getCurrentContent()),
      deleteService: false
    };
    console.log('Service Update: ', serviceUpdate);

    try {
      await axios.post(`http://localhost:3002/api/save-service`, { serviceUpdate });
      setIsSaved(true);
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Error saving service');
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
  
    // Display a confirmation dialog and proceed with deletion if confirmed
    const confirmed = window.confirm('Are you sure you want to delete this service?');
  
    if (!confirmed) {
      return; // User canceled the deletion
    }
  
    const serviceUpdate = {
      _id: data?._id,
      name: updatedService.name || data?.name,
      priceRange: updatedService.priceRange || data?.priceRange,
      richTextContent: stateToHTML(editorState.getCurrentContent()),
      deleteService: true
    };
    console.log('Service Deleted: ', serviceUpdate);
  
    try {
      await axios.post(`http://localhost:3002/api/save-service`, { serviceUpdate });
      setIsSaved(true);
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Error deleting service');
    }
  };
  

  if (isSaved) {
    return (
        <div>
          <h1>Saved Successfully</h1>
          <Link to="/OwnersPortal" onClick={handleReturnToPortal}>
            <h3>Click here to return to the owners portal</h3>
          </Link>
          {/* You can add any other success-related content here */}
        </div>
    )
  } else {
  return (
    <div key={index} className={`dropdown-item ${selectedService ? 'active' : ''}`}>
        <div className="dropdown-title" onClick={handleDropdownItemClick}>
          <h5>Service ID: {data?._id}</h5>
          <h5>Service Name: {data?.name}</h5>
          <span className={`services-caret ${selectedService ? 'caret-up' : ''}`}></span>
        </div>
        {selectedService && (
          <div className="dropdown-content">
          <form className='ContactForm' onSubmit={handleSubmit}>
            <label htmlFor='name' className='FormElement'>Name: </label>
            <input
              type='text'
              name='name'
              className='FormElement'
              placeholder={data?.name}
              value={updatedService.name}
              onChange={handleChange}
            />
            <label htmlFor='priceRange' className='FormElement'>Price Range: </label>
            <input
              type='text'
              name='priceRange'
              className='FormElement'
              placeholder={data?.priceRange}
              value={updatedService.priceRange}
              onChange={handleChange}
            />
            <div className='editor-container'>
              <label htmlFor="richTextContent" className='FormElement'>Service Description: </label>
              <div className='toolbar'>
                <button type='button' onClick={() => toggleInlineStyle('BOLD')}>Bold</button>
                <button type='button' onClick={() => toggleInlineStyle('ITALIC')}>Italic</button>
                <button type='button' onClick={() => toggleInlineStyle('UNDERLINE')}>Underline</button>
                <button type='button' onClick={() => toggleTextColor('red')}>Text Color (Red)</button>
                <button type='button' onClick={() => toggleTextHighlight('yellow')}>Text Highlight (Yellow)</button>
                <button type='button' onClick={() => toggleFontSize('16px')}>Font Size (16px)</button>
                <button type='button' onClick={() => toggleFontFamily('Arial')}>Font Family (Arial)</button>
                <button type='button' onClick={() => toggleBlockType('unordered-list-item')}>Bullet List</button>
                <button type='button' onClick={() => toggleBlockType('ordered-list-item')}>Numbered List</button>
                <button type='button' onClick={insertLink}>Insert Link</button>
                <button type='button' onClick={() => toggleBlockType('blockquote')}>Block Quote</button>
              </div>
              <div className='editor-content' style={{ cursor: 'text' }}>
                <Editor
                  editorState={editorState}
                  onChange={setEditorState}
                  handleKeyCommand={handleKeyCommand}
                  placeholder={data?.richTextContent}
                />
              </div>
            </div>
            <button type='submit' className='FormElement'>Save Service</button>
          </form>
            <button className='FormElement' onClick={handleDelete} style={{ backgroundColor:'red', color:'white'}}>Delete Service</button>
        </div>
      )}
    </div>
  );
        }
}

export default EditServiceSingleComponent;