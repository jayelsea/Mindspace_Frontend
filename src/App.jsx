import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './App.css';

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
    <div>
      <h1>Bienvenido, {user.username || 'usuario'}!</h1>
      {/* Aquí irá el dashboard o la navegación principal */}
    </div>
  );
}

export default App;
