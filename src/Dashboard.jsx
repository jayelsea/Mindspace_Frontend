import { useState, useEffect } from 'react';
import './Dashboard.css';
import AddMateriaModal from './components/AddMateriaModal';
import EditMateriaModal from './components/EditMateriaModal';

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
  const [materias, setMaterias] = useState([]);
  const [showAddMateria, setShowAddMateria] = useState(false);
  const [editMateria, setEditMateria] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (activeSection === 'materias') {
      fetchMaterias();
    }
  }, [activeSection]);

  const fetchMaterias = async () => {
    try {
      const token = localStorage.getItem('access');
      // Solo traer materias activas
      const res = await fetch(`${import.meta.env.VITE_API_URL}/materias/?activo=true`, {
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      if (!res.ok) throw new Error('Error al cargar materias');
      const data = await res.json();
      setMaterias(data);
    } catch (err) {
      setMaterias([]);
    }
  };

  const handleAddMateria = async (data) => {
    setShowAddMateria(false);
    try {
      const token = localStorage.getItem('access');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/materias/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Error al agregar materia');
      await fetchMaterias();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditMateria = async (data) => {
    setShowEditModal(false);
    try {
      const token = localStorage.getItem('access');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/materias/${data.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Error al editar materia');
      await fetchMaterias();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteMateria = async (id) => {
    if (!window.confirm('¿Eliminar esta materia?')) return;
    try {
      const token = localStorage.getItem('access');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/materias/${id}/`, {
        method: 'DELETE',
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      if (!res.ok) throw new Error('Error al eliminar materia');
      await fetchMaterias();
    } catch (err) {
      alert(err.message);
    }
  };

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
      // Sección materias eliminada para restaurar versión simple
      case 'materias':
        return (
          <div className="dashboard-content-section">
            <h1>Materias</h1>
            <p>Gestiona tus materias y temas de estudio</p>
            <div className="dashboard-cards">
              {materias.length === 0 && <div className="dashboard-card">No hay materias registradas.</div>}
              {materias.map(m => (
                <div key={m.id} className="dashboard-card">
                  <strong>{m.nombre}</strong> {m.codigo && <span style={{color:'#888'}}>({m.codigo})</span>}<br/>
                  <span style={{fontSize:'0.95rem',color:'#666'}}>{m.descripcion}</span><br/>
                  <span style={{fontSize:'0.95rem',color:'#666'}}>Profesor: {m.profesor || '-'} | Créditos: {m.creditos} | Semestre: {m.semestre || '-'}</span>
                  <div style={{marginTop:'1rem',display:'flex',gap:'1rem'}}>
                    <button style={{background:'#e0e0ff',border:'none',borderRadius:'4px',padding:'0.4rem 1.2rem',cursor:'pointer'}} onClick={()=>{setEditMateria(m);setShowEditModal(true);}}>Editar</button>
                    <button style={{background:'#ffdddd',border:'none',borderRadius:'4px',padding:'0.4rem 1.2rem',cursor:'pointer'}} onClick={()=>handleDeleteMateria(m.id)}>Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop:'2.5rem',textAlign:'center'}}>
              <button style={{background:'#3B82F6',color:'#fff',fontSize:'1.15rem',padding:'1rem 2.5rem',border:'none',borderRadius:'8px',boxShadow:'0 2px 8px #0001',cursor:'pointer'}} onClick={()=>setShowAddMateria(true)}>Agregar Materia</button>
            </div>
            <AddMateriaModal open={showAddMateria} onClose={() => setShowAddMateria(false)} onSubmit={handleAddMateria} />
            <EditMateriaModal open={showEditModal} onClose={()=>setShowEditModal(false)} onSubmit={handleEditMateria} materia={editMateria} />
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
  
  // Funcionalidad de materias eliminada para restaurar versión simple
}
