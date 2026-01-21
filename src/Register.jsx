
import { useState } from 'react';
import './Register.css';
import logo from './assets/logo.png';
import API_BASE_URL from './apiConfig';

export default function Register({ onRegister, onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function isValidEmail(email) {
    // Expresión regular básica para validar emails
    return /^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email);
  }

  function isStrongPassword(pw) {
    // Mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número y un símbolo
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(pw);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!isValidEmail(email)) {
      setError('El correo electrónico no es válido.');
      return;
    }
    if (!isStrongPassword(password)) {
      setError('La contraseña debe tener al menos 8 caracteres, incluir mayúscula, minúscula, número y símbolo.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, password2: confirmPassword })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Error al registrar');
      }
      onRegister();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-mockup-bg">
      <div className="register-mockup-container">
        <div className="register-mockup-formside">
          <div className="register-mockup-logo">MindSpace+</div>
          <form className="register-mockup-form" onSubmit={handleSubmit}>
            <h2>Crear cuenta</h2>
            <p className="register-mockup-sub">Regístrate gratis y accede a todas las funciones.</p>
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
              Correo electrónico
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="Correo electrónico"
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
            <label>
              Repetir contraseña
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                placeholder="Repetir contraseña"
              />
            </label>
            {error && <div className="register-error">{error}</div>}
            <button type="submit" className="register-mockup-submit" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
            <div className="register-mockup-switch">
              ¿Ya tienes cuenta?
              <span className="register-link" onClick={onSwitchToLogin}>
                Inicia sesión
              </span>
            </div>
          </form>
        </div>
        <div className="register-mockup-imgside">
          <div className="register-mockup-imgbox">
            <img src={logo} alt="MindSpace logo" />
          </div>
          <div className="register-mockup-imgtext">
            <h3>Organiza tu aprendizaje.</h3>
            <p>Regístrate y lleva el control de tus apuntes, progreso y métricas académicas con MindSpace+.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
