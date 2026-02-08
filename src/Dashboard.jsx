// ...existing code...
import { useState, useEffect } from 'react';
import MindMapView from './components/MindMapView';
import './Dashboard.css';
import AddMateriaModal from './components/AddMateriaModal';
import EditMateriaModal from './components/EditMateriaModal';
import NoteForm from './components/NoteForm';
import AddTemaModal from './components/AddTemaModal';
import ResumenSection from './components/ResumenSection';

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
  // Estado para mapa mental
  const [showMindMapModal, setShowMindMapModal] = useState(false);
  const [mindMapData, setMindMapData] = useState(null);
  const [mindMapLoading, setMindMapLoading] = useState(false);
  const [mindMapError, setMindMapError] = useState(null);
  const [materias, setMaterias] = useState([]);
  const [showAddMateria, setShowAddMateria] = useState(false);
  const [editMateria, setEditMateria] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMateria, setSelectedMateria] = useState(null);
  const [temas, setTemas] = useState([]);
  const [apuntes, setApuntes] = useState([]);
  const [showAddApunteModal, setShowAddApunteModal] = useState(false);
  const [apunteFormTema, setApunteFormTema] = useState(null);
  const [temaParaAgregar, setTemaParaAgregar] = useState(null); // Nuevo estado para agregar
  const [showAddTemaModal, setShowAddTemaModal] = useState(false);
  const [apunteDesplegado, setApunteDesplegado] = useState({}); // Estado para apuntes desplegados

  useEffect(() => {
    const fetchMateriasYTemas = async () => {
      if (activeSection === 'materias' || activeSection === 'apuntes' || activeSection === 'mapa') {
        await fetchMaterias();
        if (activeSection === 'mapa') {
          // Traer temas de todas las materias
          try {
            const token = localStorage.getItem('access');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/temas/?activo=true`, {
              headers: {
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
              }
            });
            if (!res.ok) throw new Error('Error al cargar temas');
            const data = await res.json();
            setTemas(data);
          } catch (err) {
            setTemas([]);
          }
        }
      }
      if (activeSection === 'resumen') {
        fetchAllApuntes();
      }
      if (activeSection !== 'apuntes') {
        setSelectedMateria(null);
        setApuntes([]);
      }
    };
    fetchMateriasYTemas();
  }, [activeSection]);

  // Cargar todos los apuntes del usuario
  const fetchAllApuntes = async () => {
    try {
      const token = localStorage.getItem('access');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/apuntes/?activo=true`, {
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      if (!res.ok) throw new Error('Error al cargar apuntes');
      const data = await res.json();
      setApuntes(data);
    } catch (err) {
      setApuntes([]);
    }
  };

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

  // Cargar temas de una materia
  const fetchTemas = async (materiaId) => {
    try {
      const token = localStorage.getItem('access');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/temas/?materia_id=${materiaId}`, {
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      if (!res.ok) throw new Error('Error al cargar temas');
      const data = await res.json();
      setTemas(data);
    } catch (err) {
      setTemas([]);
    }
  };

  // Cargar apuntes de un tema
  const fetchApuntes = async (temaId) => {
    try {
      const token = localStorage.getItem('access');
      // Filtrar solo apuntes activos
      const res = await fetch(`${import.meta.env.VITE_API_URL}/apuntes/?tema_id=${temaId}&activo=true`, {
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      if (!res.ok) throw new Error('Error al cargar apuntes');
      const data = await res.json();
      console.log('Apuntes recibidos:', data);
      setApuntes(data);
    } catch (err) {
      setApuntes([]);
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

  const handleSelectMateriaApuntes = async (materia) => {
    setSelectedMateria(materia);
    setApuntes([]);
    await fetchTemas(materia.id);
    // No cargar apuntes aquí, solo al seleccionar un tema
  };

  const handleSelectTema = async (tema) => {
    setApunteFormTema(tema);
    await fetchApuntes(tema.id);
  };

  const handleOpenAddApunte = (tema) => {
    setTemaParaAgregar(tema); // Guardar el tema actual para agregar
    setApunteFormTema(null); // Limpiar edición
    setShowAddApunteModal(true);
  };

  const handleAddApunte = async (formData) => {
    setShowAddApunteModal(false);
    try {
      const token = localStorage.getItem('access');
      // Usar temaParaAgregar como temaId
      const temaId = temaParaAgregar ? temaParaAgregar.id : (formData.tema || (temas[0] && temas[0].id) || null);
      if (!temaId) throw new Error('No se ha seleccionado un tema para el apunte.');
      const payload = {
        titulo: formData.title,
        contenido: formData.content,
        tema: temaId,
        etiquetas: formData.etiquetas || '',
        prioridad: formData.prioridad || 'media',
        activo: true
      };
      console.log('Payload apunte (add):', payload);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/apuntes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error al agregar apunte:', errorText);
        throw new Error('Error al agregar apunte');
      }
      // Obtener el apunte recién creado
      const nuevoApunte = await res.json();
      console.log('Respuesta apunte (add):', nuevoApunte);
      await fetchApuntes(temaId);
      // Desplegar automáticamente el apunte recién creado
      setApunteDesplegado(prev => ({ ...prev, [nuevoApunte.id]: true }));
      setTemaParaAgregar(null); // Limpiar estado
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditApunte = (apunte) => {
    setApunteFormTema(apunte);
    setShowAddApunteModal(true);
  };

  const handleUpdateApunte = async (formData) => {
    setShowAddApunteModal(false);
    try {
      const token = localStorage.getItem('access');
      // Obtener el id del tema asociado al apunte
      const temaId = formData.tema || apunteFormTema.tema || apunteFormTema.id;
      const payload = {
        titulo: formData.title,
        contenido: formData.content,
        tema: temaId,
        etiquetas: formData.etiquetas || '',
        prioridad: formData.prioridad || 'media',
        activo: true
      };
      console.log('Payload apunte (update):', payload);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/apuntes/${apunteFormTema.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error al editar apunte:', errorText);
        throw new Error('Error al editar apunte');
      }
      const updatedApunte = await res.json();
      console.log('Respuesta apunte (update):', updatedApunte);
      await fetchApuntes(temaId);
      setApunteFormTema(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteApunte = async (id) => {
    if (!window.confirm('¿Eliminar este apunte?')) return;
    try {
      const token = localStorage.getItem('access');
      console.log('Intentando eliminar apunte id:', id);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/apuntes/${id}/`, {
        method: 'DELETE',
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      console.log('Respuesta DELETE apunte:', res.status, res.statusText);
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error al eliminar apunte:', errorText);
        throw new Error('Error al eliminar apunte');
      }
      // Limpiar estado de apuntes y apunteDesplegado
      setApuntes([]);
      setApunteDesplegado({});
      // Recargar apuntes del tema actual
      const temaId = apunteFormTema && apunteFormTema.id ? apunteFormTema.id : (temaParaAgregar && temaParaAgregar.id ? temaParaAgregar.id : null);
      if (temaId) {
        await fetchApuntes(temaId);
      }
    } catch (err) {
      alert(err.message);
      console.error('Catch eliminar apunte:', err);
    }
  };

  const handleAddTema = async (data) => {
    setShowAddTemaModal(false);
    try {
      const token = localStorage.getItem('access');
      // Calcular el siguiente orden disponible para la materia
      const ordenDisponible = temas.length > 0
        ? Math.max(...temas.map(t => t.orden || 0)) + 1
        : 1;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/temas/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          titulo: data.nombre, // corregido
          descripcion: data.descripcion,
          materia: selectedMateria.id,
          orden: ordenDisponible
        })
      });
      if (!res.ok) throw new Error('Error al agregar tema');
      await fetchTemas(selectedMateria.id);
    } catch (err) {
      alert(err.message);
    }
  };

  // Generar mapa conceptual de un tema (real)
  const handleGenerarMapaConceptual = async (tema) => {
    setShowMindMapModal(true);
    setMindMapData(null);
    setMindMapError(null);
    setMindMapLoading(true);
    try {
      const token = localStorage.getItem('access');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/temas/${tema.id}/mapa-mental/`, {
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Error al generar el mapa mental');
      }
      const data = await res.json();
      setMindMapData(data.mapa_mental || data);
    } catch (err) {
      setMindMapError(err.message || 'Error desconocido');
    } finally {
      setMindMapLoading(false);
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
      case 'apuntes':
        return (
          <div className="dashboard-content-section">
            <h1>Apuntes</h1>
            <p>Selecciona una materia para ver sus temas y apuntes.</p>
            <div className="dashboard-cards">
              {materias.length === 0 && <div className="dashboard-card">No hay materias registradas.</div>}
              {materias.map(m => (
                <div key={m.id} className={`dashboard-card${selectedMateria && selectedMateria.id === m.id ? ' selected' : ''}`}
                  style={{cursor:'pointer'}}
                  onClick={() => handleSelectMateriaApuntes(m)}>
                  <strong>{m.nombre}</strong> {m.codigo && <span style={{color:'#888'}}>({m.codigo})</span>}<br/>
                  <span style={{fontSize:'0.95rem',color:'#666'}}>{m.descripcion}</span><br/>
                  <span style={{fontSize:'0.95rem',color:'#666'}}>Profesor: {m.profesor || '-'} | Créditos: {m.creditos} | Semestre: {m.semestre || '-'}</span>
                </div>
              ))}
            </div>
            {selectedMateria && (
              <div style={{marginTop:'1.5rem'}}>
                <h3 style={{marginBottom:'0.7rem'}}>Temas de {selectedMateria.nombre}</h3>
                <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
                  {temas.length === 0 ? (
                    <div style={{color:'#b00'}}>No hay temas registrados para esta materia.</div>
                  ) : (
                    temas.map(t => (
                      <button key={t.id} style={{background:'#e0eaff',border:'none',borderRadius:'4px',padding:'0.5rem 1.2rem',fontWeight:'bold',cursor:'pointer'}} onClick={()=>handleSelectTema(t)}>
                        {t.titulo || t.nombre}
                      </button>
                    ))
                  )}
                  <button style={{background:'#e0eaff',border:'none',borderRadius:'4px',padding:'0.4rem 1rem',fontSize:'0.95rem',fontWeight:'bold',cursor:'pointer'}} onClick={()=>setShowAddTemaModal(true)}>+ Tema</button>
                </div>
              </div>
            )}
            {apunteFormTema && (
              <div style={{marginTop:'2rem'}}>
                <h2>Apuntes de {apunteFormTema.titulo || apunteFormTema.nombre}</h2>
                <button style={{marginBottom:'1.5rem',background:'#e0ffe0',border:'none',borderRadius:'4px',padding:'0.6rem 1.5rem',fontWeight:'bold',cursor:'pointer'}} onClick={()=>handleOpenAddApunte(apunteFormTema)}>Agregar Apunte</button>
                {apuntes.length === 0 && <div>No hay apuntes registrados para este tema.</div>}
                <div style={{display:'flex',flexWrap:'wrap',gap:'1.5rem'}}>
                  {apuntes.map(a => (
                    <div key={a.id} style={{border:'1px solid #ddd',borderRadius:'8px',padding:'1rem',minWidth:'260px',background:'#fafaff',position:'relative'}}>
                      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <div style={{fontWeight:'bold',fontSize:'1.1rem'}}>{a.titulo}</div>
                        <button
                          style={{background:'none',border:'none',cursor:'pointer',fontSize:'1.2rem',padding:'0.2rem'}}
                          onClick={()=>setApunteDesplegado(prev=>({...prev,[a.id]:!prev[a.id]}))}
                          aria-label={apunteDesplegado[a.id] ? 'Ocultar detalles' : 'Mostrar detalles'}
                        >
                          {apunteDesplegado[a.id] ? '▲' : '▼'}
                        </button>
                      </div>
                      {apunteDesplegado[a.id] && (
                        <div>
                          <div style={{fontSize:'0.95rem',color:'#333',marginBottom:'0.5rem',background:'#f5f5f5',padding:'0.5rem',borderRadius:'4px'}}>
                            {typeof a.contenido === 'string' && a.contenido.trim() !== '' ? a.contenido : '[Sin contenido]'}
                          </div>
                        </div>
                      )}
                      <div style={{marginTop:'0.7rem',display:'flex',gap:'0.7rem'}}>
                        <button style={{background:'#e0e0ff',border:'none',borderRadius:'4px',padding:'0.3rem 1rem',cursor:'pointer'}} onClick={()=>handleEditApunte(a)}>Editar</button>
                        <button style={{background:'#ffdddd',border:'none',borderRadius:'4px',padding:'0.3rem 1rem',cursor:'pointer'}} onClick={()=>handleDeleteApunte(a.id)}>Borrar</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {showAddApunteModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h2>{apunteFormTema && apunteFormTema.id ? 'Editar Apunte' : `Agregar Apunte a "${temaParaAgregar ? (temaParaAgregar.titulo || temaParaAgregar.nombre) : selectedMateria?.nombre}"`}</h2>
                  <NoteForm 
                    onSubmit={apunteFormTema && apunteFormTema.id ? handleUpdateApunte : handleAddApunte}
                    initialData={apunteFormTema && apunteFormTema.id ? apunteFormTema : (temaParaAgregar ? { tema: temaParaAgregar.id } : {})}
                    onCancel={()=>{setShowAddApunteModal(false);setApunteFormTema(null);setTemaParaAgregar(null);}}
                    temas={temas}
                    allowTemaSelect={!apunteFormTema || !apunteFormTema.id}
                  />
                </div>
              </div>
            )}
            {showAddTemaModal && (
              <AddTemaModal open={showAddTemaModal} onClose={()=>setShowAddTemaModal(false)} onSubmit={handleAddTema} materia={selectedMateria.id} />
            )}
          </div>
        );
      case 'resumen':
        return <ResumenSection apuntes={apuntes} tema={apunteFormTema} />;
      case 'mapa':
        return (
          <div className="dashboard-content-section">
            <h1>Generar Mapa Mental</h1>
            <p>Visualiza tus conceptos en mapas mentales</p>
            <div style={{marginTop:'2rem'}}>
              {materias.length === 0 ? (
                <div>No hay materias registradas.</div>
              ) : (
                materias.map(m => (
                  <div key={m.id} style={{marginBottom:'2.5rem'}}>
                    <h3 style={{color:'#3B82F6',marginBottom:'0.7rem'}}>{m.nombre}</h3>
                    {temas.filter(t => t.materia === m.id).length === 0 ? (
                      <div style={{color:'#b00',marginLeft:'1.5rem'}}>No hay temas para esta materia.</div>
                    ) : (
                      <div style={{display:'flex',flexWrap:'wrap',gap:'1.5rem',marginLeft:'1.5rem'}}>
                        {temas.filter(t => t.materia === m.id).map(t => (
                          <div key={t.id} style={{border:'1px solid #ddd',borderRadius:'8px',padding:'1.2rem',minWidth:'240px',background:'#fafaff',boxShadow:'0 2px 8px #0001',display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                            <div style={{fontWeight:'bold',fontSize:'1.1rem',marginBottom:'0.5rem'}}>{t.titulo || t.nombre}</div>
                            <div style={{fontSize:'0.95rem',color:'#333',marginBottom:'0.7rem',background:'#f5f5f5',padding:'0.5rem',borderRadius:'4px',maxHeight:'80px',overflow:'auto'}}>
                              {typeof t.descripcion === 'string' && t.descripcion.trim() !== '' ? t.descripcion : '[Sin descripción]'}
                            </div>
                            <button style={{background:'#e0eaff',border:'none',borderRadius:'4px',padding:'0.5rem 1.2rem',fontWeight:'bold',cursor:'pointer'}} onClick={()=>handleGenerarMapaConceptual(t)}>
                              Generar Mapa Conceptual
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            {/* Modal para mostrar el mapa mental */}
            {showMindMapModal && (
              <div className="modal-overlay" style={{zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <div className="modal-content" style={{maxWidth:'900px',width:'90vw',maxHeight:'80vh',padding:'2rem',position:'relative',overflow:'hidden',background:'#fff',borderRadius:'16px',boxShadow:'0 4px 32px #0002'}}>
                  <button onClick={()=>setShowMindMapModal(false)} style={{position:'absolute',top:'1rem',right:'1rem',background:'#eee',border:'none',borderRadius:'50%',width:'2rem',height:'2rem',fontWeight:'bold',cursor:'pointer'}}>✕</button>
                  <h2 style={{marginBottom:'1.5rem',textAlign:'center'}}>Mapa Mental Generado</h2>
                  <div style={{overflowY:'auto',maxHeight:'65vh',paddingRight:'0.5rem'}}>
                    {mindMapLoading && <div>Cargando mapa mental...</div>}
                    {mindMapError && <div style={{color:'#b00'}}>Error: {mindMapError}</div>}
                    {mindMapData && <MindMapView data={mindMapData} />}
                  </div>
                </div>
              </div>
            )}
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
          <h2 style={{marginBottom:'0.7rem'}}>MindSpace+</h2>
          <img src="/mindspace-logo.svg" alt="MindSpace Logo" style={{width:'80px',height:'80px',margin:'0.5rem auto 1.2rem',display:'block',objectFit:'contain'}} />
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
