import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      setMessage(`Erro: ${error.message}`);
    } else {
      setMessage('Verifique seu e-mail para o link de redefinição de senha!');
    }
    setLoading(false);
  };

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h2>Esqueci a senha</h2>
        <p>Digite seu e-mail para receber um link de redefinição.</p>
        {message && <p className={`form-message ${message.includes('Erro') ? 'error-message' : 'success-message'}`}>{message}</p>}
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="forgot-password-button" disabled={loading}>
          {loading ? 'Enviando...' : 'Redefinir Senha'}
        </button>
        <p className="login-link">
          <a href="/login">Voltar para o Login</a>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;