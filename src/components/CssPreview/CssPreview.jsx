import React from 'react';
import './CssPreview.css';

const CssPreview = ({ code }) => {
  return (
    <div className="css-preview-container">
      <style dangerouslySetInnerHTML={{ __html: code }} />
      <div className="preview-box">
        <h4>Visualização</h4>
        <div className="preview-elements-wrapper">
          <h3>Título de Exemplo</h3>
          <p>Este é um parágrafo de exemplo. Ele pode ser estilizado pelo seu CSS.</p>
          <a href="#" className="preview-link">Link de Exemplo</a>
          <button className="preview-btn">Botão de Exemplo</button>
        </div>
      </div>
    </div>
  );
};

export default CssPreview;