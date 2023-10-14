import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Editor, EditorState, RichUtils, ContentState, convertFromHTML, Modifier, SelectionState } from 'draft-js';
import 'draft-js/dist/Draft.css'; // Import Draft.js styles
import { stateToHTML } from 'draft-js-export-html';
import axios from 'axios';
import { SketchPicker } from 'react-color';
import './OverallStyleSheet.css';

function OwnerServiceUpdate() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState('black'); // Default color
  const [serviceData, setServiceData] = useState({
    serviceName: '',
    priceRange: '',
    richTextContent: editorState,
  });
  const [isSaved, setIsSaved] = useState(false); // Track whether service is saved

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    {/*serviceData.richTextContent = editorState.getCurrentContent();*/}
  const contentState = editorState.getCurrentContent();
  const html = stateToHTML(contentState);

    const _id = '59c5d3f7-f071-47a0-a71b-69696969696';

    const serviceUpdate = {
      _id,
      name: serviceData.serviceName,
      priceRange: serviceData.priceRange,
      richTextContent: html,

    };

    try {
      // Send a POST request to save the content to MongoDB
      await axios.post(`http://localhost:3002/api/save-service`, { serviceUpdate });
      setIsSaved(true); // Set the state to indicate successful save
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Error saving service');
    }
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleTextColor = (color) => {
    if (color === 'custom') {
      // Show the color picker when "Custom" is selected
      setColorPickerVisible(!colorPickerVisible);
    } else {
      const contentState = editorState.getCurrentContent();
      const selectionState = editorState.getSelection();
      const inlineStyle = editorState.getCurrentInlineStyle();
      const newContentState = Modifier.applyInlineStyle(
        contentState,
        selectionState,
        `COLOR-${color}`
      );
      const newState = EditorState.push(editorState, newContentState, 'change-inline-style');
      setEditorState(newState);
    }
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

  const handleReturnToPortal = (event) => {
    event.preventDefault();
    setIsSaved(false);
    setServiceData({
      serviceName: '',
      priceRange: '',
      richTextContent: editorState,
    });
    setEditorState(() => EditorState.createEmpty());

    // Refresh the page
    window.location.reload();
  }

  return (
    <div>
      {isSaved ? ( // Conditional rendering based on the isSaved state
        <div>
          <h1>Saved Successfully</h1>
          <Link to="/OwnersPortal" onClick={handleReturnToPortal}><h3>Click here to return to the owners portal</h3></Link>
          {/* You can add any other success-related content here */}
        </div>
      ) : (
    <form className='ContactForm' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="serviceName" className='FormElement'>Service Name: </label>
        <input type="text" name="serviceName" className='FormElement' value={serviceData.serviceName} onChange={handleChange} />
        <br />
        <label htmlFor="priceRange" className='FormElement'>Price Range: </label>
        <input type="text" name="priceRange" className='FormElement' value={serviceData.priceRange} onChange={handleChange} />
        </div>
        <div className='editor-container'>
        <label htmlFor="richTextContent" className='FormElement'>Service Description: </label>
        <div className='toolbar'>
                <button type='button' onClick={() => toggleInlineStyle('BOLD')}>Bold</button>
                <button type='button' onClick={() => toggleInlineStyle('ITALIC')}>Italic</button>
                <button type='button' onClick={() => toggleInlineStyle('UNDERLINE')}>Underline</button>
                <button type='button' onClick={() => toggleTextColor('custom')}>Text Color (Custom)</button>
                {colorPickerVisible && (
                    <div className='color-picker'>
                      <SketchPicker
                        color={selectedColor}
                        onChange={(color) => setSelectedColor(color.hex)}
                        onClose={() => setColorPickerVisible(false)}
                      />
                      <button onClick={() => setColorPickerVisible(false)}>Confirm Color</button>
                    </div>
                  )}
                <button type='button' onClick={() => toggleTextHighlight('yellow')}>Text Highlight (Yellow)</button>
                <button type='button' onClick={() => toggleFontSize('16px')}>Font Size (16px)</button>
                <button type='button' onClick={() => toggleFontFamily('Arial')}>Font Family (Arial)</button>
                <button type='button' onClick={() => toggleBlockType('unordered-list-item')}>Bullet List</button>
                <button type='button' onClick={() => toggleBlockType('ordered-list-item')}>Numbered List</button>
                <button type='button' onClick={insertLink}>Insert Link</button>
                <button type='button' onClick={() => toggleBlockType('blockquote')}>Block Quote</button>
        </div>
        <div className='editor-content'>
        <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        customStyleMap={{
          // Define a custom style map to apply the selected text color
          'COLOR-red': {
            color: 'red',
          },
          'COLOR-custom': {
            color: selectedColor,
          },
        }}
        placeholder='Start typing here...'
      />
      </div>
      </div>
      <button type="submit" className='FormElement'>Submit Service Update</button>
      </form>
  )}
  </div>
      );
}

export default OwnerServiceUpdate;
