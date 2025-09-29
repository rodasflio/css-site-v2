import React, { useState, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient.jsx';
import './UploadForm.css';

const UploadForm = () => {
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith('.css')) {
        setFile(droppedFile);
        setFileName(droppedFile.name);
        setMessage('');
      } else {
        setMessage('Por favor, selecione apenas arquivos .css');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.name.endsWith('.css')) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setMessage('');
      } else {
        setMessage('Por favor, selecione apenas arquivos .css');
        e.target.value = null;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!fileName || !description || !file) {
      setMessage('Por favor, preencha todos os campos e selecione um arquivo.');
      setLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileContent = event.target.result;

      const { data, error } = await supabase
        .from('css_files')
        .insert([
          { name: fileName, description: description, code: fileContent }
        ])
        .select();

      if (error) {
        console.error('Erro ao salvar no banco de dados:', error);
        setMessage('Erro ao salvar o arquivo. Tente novamente.');
      } else {
        setMessage('Arquivo salvo com sucesso!');
        // Limpa o formulário após o sucesso
        setFileName('');
        setDescription('');
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      }
      setLoading(false);
    };
    reader.readAsText(file);
  };

  return (
    <section className="upload-form-container">
      <h2>Enviar Novo Arquivo CSS</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        {message && <p className={`form-message ${message.includes('Erro') ? 'error-message' : 'success-message'}`}>{message}</p>}
        <div className="form-group">
          <label htmlFor="fileName">Nome do Arquivo</label>
          <input
            type="text"
            id="fileName"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="ex: buttons.css"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Uma breve descrição do que este arquivo faz."
            rows="3"
            required
          ></textarea>
        </div>
        
        <div 
          className="drop-area" 
          onDragOver={handleDragOver} 
          onDrop={handleDrop} 
          onClick={() => fileInputRef.current.click()}
        >
          {file ? (
            <p>Arquivo selecionado: <strong>{file.name}</strong></p>
          ) : (
            <p>Arraste e solte seu arquivo .css aqui, ou clique para selecionar.</p>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".css"
            hidden
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Arquivo'}
        </button>
      </form>
    </section>
  );
};

export default UploadForm;