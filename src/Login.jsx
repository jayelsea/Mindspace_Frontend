import { useState } from 'react';
import API_BASE_URL from './apiConfig';


import './LoginDashboard.css';
import logo from './assets/logo.png';

export default function Login({ onLogin, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }
      const data = await response.json();
      onLogin(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-dashboard-bg">
      <div className="login-dashboard-container">
        <div className="login-dashboard-formside">
          <div className="login-dashboard-logo">MindSpace+</div>
          <form className="login-dashboard-form" onSubmit={handleSubmit}>
            <h2>Iniciar sesión</h2>
            <p>Accede a tu cuenta para gestionar y analizar tu aprendizaje.</p>
            <label>
              Usuario
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoFocus
                placeholder="Nombre de usuario"
              />
            </label>
            <label>
              Contraseña
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Contraseña"
              />
            </label>
            {error && <div className="login-dashboard-error">{error}</div>}
            <button type="submit" className="login-dashboard-submit" disabled={loading}>
              {loading ? 'Ingresando...' : 'Iniciar sesión'}
            </button>
            <div className="login-dashboard-switch">
              ¿No tienes cuenta?
              <span className="login-dashboard-link" onClick={onSwitchToRegister}>
                Regístrate
              </span>
            </div>
          </form>
        </div>
        <div className="login-dashboard-imgside">
          <div className="login-dashboard-imgbox">
            <img src={logo} alt="MindSpace logo" style={{ width: '220px', borderRadius: '12px', boxShadow: '0 2px 16px rgba(108, 99, 255, 0.10)' }} />
          </div>
          <div className="login-dashboard-imgtext">
            <h3>¡Bienvenido de nuevo!</h3>
            <p>Inicia sesión para continuar organizando tus apuntes y potenciar tu aprendizaje con MindSpace+.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
