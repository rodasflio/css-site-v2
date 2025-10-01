import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import './RegisterPage.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Novo estado
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordStatus, setPasswordStatus] = useState({
    isValid: false,
    message: '',
  });
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    const minLength = pwd.length >= 8;
    
    let characterTypes = 0;
    if (/[a-z]/.test(pwd)) characterTypes++;
    if (/[A-Z]/.test(pwd)) characterTypes++;
    if (/[0-9]/.test(pwd)) characterTypes++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(pwd)) characterTypes++;
    
    const hasEnoughCharacterTypes = characterTypes >= 2;
    
    if (minLength && hasEnoughCharacterTypes) {
      setPasswordStatus({
        isValid: true,
        message: 'Senha forte!',
      });
    } else if (!minLength) {
      setPasswordStatus({
        isValid: false,
        message: 'A senha deve ter no mínimo 8 caracteres.',
      });
    } else {
      setPasswordStatus({
        isValid: false,
        message: 'Use uma combinação de letras maiúsculas, minúsculas, números ou símbolos.',
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      setLoading(false);
      return;
    }

    if (!passwordStatus.isValid) {
      setError('Por favor, crie uma senha forte o suficiente.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccessMessage('Confira seu e-mail para validar sua conta!');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Criar Conta</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}
        
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
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            required
          />
          {password && (
            <p className={`password-status ${passwordStatus.isValid ? 'valid' : 'invalid'}`}>
              {passwordStatus.message}
            </p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="register-button" disabled={loading || !passwordStatus.isValid}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <p className="login-link">
          Já tem uma conta? <a href="/login">Faça login</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;