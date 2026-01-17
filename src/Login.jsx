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
      const response = await fetch('/api/auth/login/', {
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
    <div className="login-mockup-bg">
      <div className="login-mockup-container">
        <div className="login-mockup-formside">
          <div className="login-mockup-logo">CubeFactory</div>
          <form className="login-mockup-form" onSubmit={handleSubmit}>
            <h2>Sign in</h2>
            <p className="login-mockup-sub">Access your account</p>
            <button type="button" className="login-google-btn" disabled>
              <span className="login-google-icon">G</span> Sign in with Google
            </button>
            <div className="login-mockup-or">or</div>
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoFocus
                placeholder="Username"
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
            {error && <div className="login-error">{error}</div>}
            <button type="submit" className="login-mockup-submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
            <div className="login-mockup-switch">
              Don't have an account?{' '}
              <span className="login-link" onClick={onSwitchToRegister}>
                Sign up
              </span>
            </div>
          </form>
        </div>
        <div className="login-mockup-imgside">
          <div className="login-mockup-imgbox">
            <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80" alt="login visual" />
          </div>
          <div className="login-mockup-imgtext">
            <h3>Welcome back!</h3>
            <p>Sign in to continue organizing your notes and boost your learning with MindSpace+.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
