import React from 'react';
import './LivePreviewModal.css';

const LivePreviewModal = ({ code, onClose }) => {
  return (
    <div className="live-modal-overlay" onClick={onClose}>
      <div className="live-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="live-preview-box">
          <style dangerouslySetInnerHTML={{ __html: code }} />
          <h3>Título de Exemplo</h3>
          <p>Este é um parágrafo de exemplo. Ele pode ser estilizado pelo seu CSS.</p>
          <a href="#" className="live-preview-link">Link de Exemplo</a>
          <button className="live-preview-btn">Botão de Exemplo</button>
        </div>
      </div>
    </div>
  );
};

export default LivePreviewModal;