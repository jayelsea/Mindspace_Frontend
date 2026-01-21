// Barra de navegación principal
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-brand">MindSpace+</div>
    <ul className="navbar-links">
      <li><Link to="/">Dashboard</Link></li>
      <li><Link to="/progreso">Progreso</Link></li>
      <li><Link to="/login">Salir</Link></li>
    </ul>
  </nav>
);

export default Navbar;
