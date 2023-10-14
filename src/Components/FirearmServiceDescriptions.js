import React, { useState, useEffect } from 'react';

const FirearmServiceDescriptions = ({ tabs, setTabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleAddTab = (e) => {
    e.preventDefault();
    setTabs([...tabs, { brand: '', model: '', description: '' }]);
    if (activeTab === 0){
      setActiveTab(0);
    } else {
    setActiveTab(activeTab + 1);
    }
  };

  const handleDeleteTab = (e, index) => {
    e.preventDefault();
    const newTabs = tabs.filter((_, i) => i !== index);
    setTabs(newTabs);
    setActiveTab(activeTab - 1);
  };

  const handleInputChange = (index, field, value) => {
    const updatedTabs = [...tabs];
    updatedTabs[index][field] = value;
    setTabs(updatedTabs);
  };

  useEffect(() => {
    // Automatically hoist updates to the parent component whenever tabs change
    setTabs(tabs);
  }, [tabs, setTabs]);

  return (
    <div>
      <div className="tab-navigation">
        {tabs.map((_, index) => (
          <button
            key={index}
            className={`tab-button ${index === activeTab ? 'active' : ''}`}
            onClick={(e) => {
                e.preventDefault();
                setActiveTab(index)}}
          >
            Firearm {index + 1}
          </button>
        ))}
        <button onClick={handleAddTab}>+ Add Firearm</button>
      </div>
      <div className='firearm-description'>
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`tab-content ${index === activeTab ? 'active' : ''}`}
        >
          <label htmlFor='firearmBrand' className='FormElement'>Firearm Brand: </label>
          <input
            type="text"
            name="firearmBrand"
            className="FormElement"
            placeholder="Firearm Brand"
            value={tab.brand}
            onChange={(e) => handleInputChange(index, 'brand', e.target.value)}
          />
          <label htmlFor='firearmModel' className='FormElement'>Firearm Model: </label>
          <input
            type="text"
            className="FormElement"
            name="firearmModel"
            placeholder="Firearm Model"
            value={tab.model}
            onChange={(e) => handleInputChange(index, 'model', e.target.value)}
          />
          <label htmlFor='firearmDescription' className='FormElement'>Firearm description: </label>
          <textarea
            name='firearmDescription'
            className="FormElement"
            placeholder="Provide as detailed a description as possible"
            value={tab.description}
            onChange={(e) =>
              handleInputChange(index, 'description', e.target.value)
            }
          />
          <button className='FormElement' style={{background:'red', color:'white'}} onClick={(e) => handleDeleteTab(e, index)}>Delete Firearm from Service Request</button>
        </div>
      ))}
      </div>
    </div>
  );
};

export default FirearmServiceDescriptions;


