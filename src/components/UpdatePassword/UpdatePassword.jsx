import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import './UpdatePassword.css';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage(`Erro ao atualizar a senha: ${error.message}`);
    } else {
      setMessage('Senha atualizada com sucesso!');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <div className="update-password-container">
      <form className="update-password-form" onSubmit={handleSubmit}>
        <h2>Redefinir Senha</h2>
        <p>Digite sua nova senha abaixo.</p>
        {message && <p className={`form-message ${message.includes('Erro') ? 'error-message' : 'success-message'}`}>{message}</p>}
        <div className="form-group">
          <label htmlFor="password">Nova Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirme a Nova Senha</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="update-password-button" disabled={loading}>
          {loading ? 'Atualizando...' : 'Atualizar Senha'}
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;