import { useState } from 'react';
import './Dashboard.css';

const sectionTitles = {
  inicio: 'Dashboard',
  materias: 'Materias',
  apuntes: 'Apuntes',
  resumen: 'Generar Resumen Automático',
  fichas: 'Generar Fichas de Estudio',
  mapa: 'Generar Mapa Mental',
  progreso: 'Progreso y Estadísticas',
  apoyo: 'Funciones de Apoyo',
};

export default function Dashboard({ user, onLogout }) {
  const [activeSection, setActiveSection] = useState('inicio');

  const renderContent = () => {
    switch (activeSection) {
      case 'inicio':
        return (
          <div className="dashboard-content-section">
            <h1>Bienvenido a MindSpace+</h1>
            <p>Tu espacio personal de aprendizaje</p>
            <div className="dashboard-cards">
              <div className="dashboard-card">
                <h3>📚 Materias</h3>
                <p>Organiza tus materias de estudio</p>
              </div>
              <div className="dashboard-card">
                <h3>📝 Apuntes</h3>
                <p>Guarda y estructura tus apuntes</p>
              </div>
              <div className="dashboard-card">
                <h3>📊 Progreso</h3>
                <p>Visualiza tu avance</p>
              </div>
            </div>
          </div>
        );
      case 'materias':
        return (
          <div className="dashboard-content-section">
            <h1>Materias</h1>
            <p>Gestiona tus materias y temas de estudio</p>
          </div>
        );
      case 'apuntes':
        return (
          <div className="dashboard-content-section">
            <h1>Apuntes</h1>
            <p>Consulta y edita tus apuntes</p>
          </div>
        );
      case 'resumen':
        return (
          <div className="dashboard-content-section">
            <h1>Generar Resumen Automático</h1>
            <p>Crea resúmenes inteligentes de tus apuntes</p>
          </div>
        );
      case 'fichas':
        return (
          <div className="dashboard-content-section">
            <h1>Generar Fichas de Estudio</h1>
            <p>Genera fichas para repasar de forma efectiva</p>
          </div>
        );
      case 'mapa':
        return (
          <div className="dashboard-content-section">
            <h1>Generar Mapa Mental</h1>
            <p>Visualiza tus conceptos en mapas mentales</p>
          </div>
        );
      case 'progreso':
        return (
          <div className="dashboard-content-section">
            <h1>Progreso y Estadísticas</h1>
            <p>Analiza tu rendimiento y avance</p>
          </div>
        );
      case 'apoyo':
        return (
          <div className="dashboard-content-section">
            <h1>Funciones de Apoyo</h1>
            <p>Herramientas adicionales para mejorar tu estudio</p>
          </div>
        );
      default:
        return <div>Selecciona una sección</div>;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-header">
          <h2>MindSpace+</h2>
          <p className="dashboard-user-name">{user?.username || 'Usuario'}</p>
        </div>
        <nav className="dashboard-nav">
          <button
            className={activeSection === 'inicio' ? 'active' : ''}
            onClick={() => setActiveSection('inicio')}
          >
            🏠 Inicio
          </button>
          <button
            className={activeSection === 'materias' ? 'active' : ''}
            onClick={() => setActiveSection('materias')}
          >
            📚 Materias
          </button>
          <button
            className={activeSection === 'apuntes' ? 'active' : ''}
            onClick={() => setActiveSection('apuntes')}
          >
            📝 Apuntes
          </button>
          <div className="dashboard-nav-divider">IA - Generación</div>
          <button
            className={activeSection === 'resumen' ? 'active' : ''}
            onClick={() => setActiveSection('resumen')}
          >
            📄 Generar Resumen
          </button>
          <button
            className={activeSection === 'fichas' ? 'active' : ''}
            onClick={() => setActiveSection('fichas')}
          >
            🔹 Generar Fichas
          </button>
          <button
            className={activeSection === 'mapa' ? 'active' : ''}
            onClick={() => setActiveSection('mapa')}
          >
            🧠 Generar Mapa Mental
          </button>
          <div className="dashboard-nav-divider">Análisis</div>
          <button
            className={activeSection === 'progreso' ? 'active' : ''}
            onClick={() => setActiveSection('progreso')}
          >
            📊 Progreso y Estadísticas
          </button>
          <button
            className={activeSection === 'apoyo' ? 'active' : ''}
            onClick={() => setActiveSection('apoyo')}
          >
            🛠️ Funciones de Apoyo
          </button>
        </nav>
        <button className="dashboard-logout" onClick={onLogout}>
          🚪 Cerrar Sesión
        </button>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="dashboard-header-title">{sectionTitles[activeSection]}</div>
          <div className="dashboard-header-actions">
            <span style={{ color: '#9E9E9E', fontSize: '1.05rem' }}>{new Date().toLocaleDateString()}</span>
            <div className="dashboard-header-avatar">
              {user?.username?.[0]?.toUpperCase() || 'U'}
            </div>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
}
