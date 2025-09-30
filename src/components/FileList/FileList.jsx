import React, { useState, useEffect } from 'react';
import CodeModal from '../CodeModal/CodeModal';
import LivePreviewModal from '../LivePreviewModal/LivePreviewModal';
import CssPreview from '../CssPreview/CssPreview';
import { supabase } from '../../lib/supabaseClient.jsx';
import './FileList.css';

const FileList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFileCode, setSelectedFileCode] = useState(null);
  const [selectedFileForPreview, setSelectedFileForPreview] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('css_files')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar arquivos:', error);
    } else {
      setFiles(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewCode = (code) => {
    setSelectedFileCode(code);
  };

  const handleViewLivePreview = (file) => {
    setSelectedFileForPreview(file);
  };

  const handleCloseModal = () => {
    setSelectedFileCode(null);
    setSelectedFileForPreview(null);
  };

  return (
    <section className="file-list">
      <h2>Arquivos CSS</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar arquivos por nome ou descrição..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <p className="loading-message">Carregando arquivos...</p>
      ) : (
        <div className="file-grid">
          {filteredFiles.length > 0 ? (
            filteredFiles.map(file => (
              <div key={file.id} className="file-card">
                <div className="file-info">
                  <h3>{file.name}</h3>
                  <p>{file.description}</p>
                </div>
                <CssPreview code={file.code} />
                <div className="file-actions">
                  <button
                    onClick={() => handleViewLivePreview(file)}
                    className="view-visual-link"
                  >
                    Ver Exemplo Visual
                  </button>
                  <button
                    onClick={() => handleViewCode(file.code)}
                    className="view-link"
                  >
                    Visualizar Código
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-files-message">Nenhum arquivo encontrado.</p>
          )}
        </div>
      )}
      {selectedFileCode && (
        <CodeModal code={selectedFileCode} onClose={handleCloseModal} />
      )}
      {selectedFileForPreview && (
        <LivePreviewModal code={selectedFileForPreview.code} onClose={handleCloseModal} />
      )}
    </section>
  );
};

export default FileList;