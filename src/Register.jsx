import { useState } from 'react';
import './Register.css';

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
      const response = await fetch('/api/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
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
          <div className="register-mockup-logo">CubeFactory</div>
          <form className="register-mockup-form" onSubmit={handleSubmit}>
            <h2>Sign up now</h2>
            <p className="register-mockup-sub">Create a free account</p>
            <button type="button" className="register-google-btn" disabled>
              <span className="register-google-icon">G</span> Sign up with Google
            </button>
            <div className="register-mockup-or">or</div>
            <label>
              Email address
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
                placeholder="Email address"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </label>
            <label>
              Repeat password
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                placeholder="Repeat password"
              />
            </label>
            {error && <div className="register-error">{error}</div>}
            <button type="submit" className="register-mockup-submit" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
            <div className="register-mockup-switch">
              Already have an account?{' '}
              <span className="register-link" onClick={onSwitchToLogin}>
                Sign in
              </span>
            </div>
          </form>
        </div>
        <div className="register-mockup-imgside">
          <div className="register-mockup-imgbox">
            <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80" alt="signup visual" />
          </div>
          <div className="register-mockup-imgtext">
            <h3>Bring your ideas to life.</h3>
            <p>Sign up for free and enjoy full access to all features for 30 days. No credit card required.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
