import React from 'react';

const HTMLPlaceholder = ({ htmlContent }) => {
  return (
    <div
      className="editor-placeholder"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default HTMLPlaceholder;
