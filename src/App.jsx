import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import './App.css';
import './Dashboard.css';

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  if (!user) {
    return showRegister ? (
      <Register
        onRegister={() => setShowRegister(false)}
        onSwitchToLogin={() => setShowRegister(false)}
      />
    ) : (
      <Login
        onLogin={setUser}
        onSwitchToRegister={() => setShowRegister(true)}
      />
    );
  }

  return (
    <Dashboard user={user} onLogout={() => setUser(null)} />
  );
}

export default App;
