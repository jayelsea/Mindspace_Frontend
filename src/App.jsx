import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import './App.css';
import './Dashboard.css';

function App() {
  const [user, setUser] = useState(() => {
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    const username = localStorage.getItem('username');
    return access && refresh && username ? { username } : null;
  });
  const [showRegister, setShowRegister] = useState(false);

  if (!user) {
    return showRegister ? (
      <Register
        onRegister={data => {
          if (data && data.tokens) {
            localStorage.setItem('access', data.tokens.access);
            localStorage.setItem('refresh', data.tokens.refresh);
            localStorage.setItem('username', data.user.username);
            setUser({ username: data.user.username });
          }
          setShowRegister(false);
        }}
        onSwitchToLogin={() => setShowRegister(false)}
      />
    ) : (
      <Login
        onLogin={data => {
          if (data && data.tokens) {
            localStorage.setItem('access', data.tokens.access);
            localStorage.setItem('refresh', data.tokens.refresh);
            localStorage.setItem('username', data.user.username);
            setUser({ username: data.user.username });
          }
        }}
        onSwitchToRegister={() => setShowRegister(true)}
      />
    );
  }

  return (
    <Dashboard user={user} onLogout={() => {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('username');
      setUser(null);
    }} />
  );
}

export default App;
