import React from 'react';
import './CodeModal.css';

const CodeModal = ({ code, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeModal;