import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ApiTestPage() {
  const [contentItems, setContentItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/api/contentful/services') // Update the endpoint
      .then(response => {
        setContentItems(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error.message);
      });
  }, []);

  return (
    <div>
      <h1>Contentful Firearms Data</h1>
      <ul>
        {contentItems.map(item => (
          <li key={item.sys.id}>
            <h2>{item.fields.name}</h2>
            <p>{item.fields.description}</p>
            <p>Price: ${item.fields.estimatedPrice}</p>
            {/* Add more properties you want to display */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApiTestPage;
