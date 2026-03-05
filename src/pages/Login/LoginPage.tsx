import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import './LoginPage.css';
import logoBeltis from '../../assets/logo_beltis.png';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password, rememberMe);
      if (success) {
        // Routing handled by App.tsx based on role
        history.push('/dashboard');
      } else {
        setError('E-mail ou senha incorretos. Tente novamente.');
      }
    } catch {
      setError('Erro ao conectar. Verifique sua conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Overlay azul */}
      <div className="login-overlay" />

      <div className="login-content">
        {/* Logo + Título */}
        <div className="login-logo-container">
          <img src={logoBeltis} alt="Beltis" className="login-logo-img" />
          <span className="login-brand-name">RH</span>
        </div>

        {/* Formulário */}
        <form className="login-form" onSubmit={handleLogin}>
          {/* Mensagem de erro */}
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <div className="login-field">
            <input
              id="login-email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              disabled={isLoading}
            />
          </div>

          <div className="login-field password-field">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Lembrar minha senha */}
          <label className="remember-me" htmlFor="remember-me-checkbox">
            <div className="remember-me-checkbox-wrap">
              <input
                id="remember-me-checkbox"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <span className="custom-checkbox">
                {rememberMe && (
                  <svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="1,5 4.5,8.5 11,1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </div>
            <span>Lembrar minha senha</span>
          </label>

          <button
            id="btn-acessar"
            type="submit"
            className="login-btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="login-btn-loading">
                <Loader2 size={20} className="spin" />
                Entrando...
              </span>
            ) : (
              'Acessar'
            )}
          </button>
        </form>

        {/* Links secundários */}
        <div className="login-links">
          <button id="btn-cadastrar" type="button" className="login-link">
            Cadastrar-se
          </button>
          <button id="btn-esqueci-senha" type="button" className="login-link">
            Esqueci minha senha
          </button>
        </div>

        {/* Footer */}
        <footer className="login-footer">
          <p>© 2026 Beltis. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;
