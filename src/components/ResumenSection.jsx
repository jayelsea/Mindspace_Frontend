import React, { useState } from 'react';
import API_BASE_URL from '../apiConfig';

const ResumenSection = ({ apuntes, tema }) => {
  const [selectedApunte, setSelectedApunte] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleResumen = async (apunte) => {
    setSelectedApunte(apunte);
    setSummary('');
    setError('');
    setLoading(true);
    try {
      const token = localStorage.getItem('access');
      const res = await fetch(`${API_BASE_URL}/apuntes/${apunte.id}/resumen/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      if (!res.ok) throw new Error('Error al generar resumen');
      const data = await res.json();
      setSummary(data.resumen || 'No se pudo generar resumen.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // (Funcionalidad movida a handleInvestigar async)

  return (
    <div className="dashboard-content-section">
      <h1>Generar Resumen Automático</h1>
      <p>Selecciona un apunte para generar su resumen o investigar.</p>
      <div style={{display:'flex',flexWrap:'wrap',gap:'1.5rem',marginBottom:'2rem'}}>
        {apuntes && apuntes.length > 0 ? (
          apuntes.map(a => (
            <div key={a.id} style={{border:'1px solid #ddd',borderRadius:'8px',padding:'1.2rem',minWidth:'260px',background:'#fafaff',boxShadow:'0 2px 8px #0001',display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
              <div style={{fontWeight:'bold',fontSize:'1.1rem',marginBottom:'0.5rem'}}>{a.titulo}</div>
              <div style={{fontSize:'0.95rem',color:'#333',marginBottom:'0.7rem',background:'#f5f5f5',padding:'0.5rem',borderRadius:'4px',maxHeight:'80px',overflow:'auto'}}>
                {typeof a.contenido === 'string' && a.contenido.trim() !== '' ? a.contenido : '[Sin contenido]'}
              </div>
              <div style={{display:'flex',gap:'0.7rem',marginTop:'0.5rem'}}>
                <button style={{background:'#e0eaff',border:'none',borderRadius:'4px',padding:'0.5rem 1.2rem',fontWeight:'bold',cursor:'pointer'}} onClick={()=>handleResumen(a)}>
                  Generar Resumen
                </button>
              </div>
              {selectedApunte && selectedApunte.id === a.id && (
                <div style={{width:'100%',marginTop:'1rem'}}>
                  {loading && <div>Procesando IA...</div>}
                  {error && <div style={{color:'red'}}>{error}</div>}
                  {summary && (
                    <div style={{background:'#f0f8ff',border:'1px solid #b3d1ff',borderRadius:'6px',padding:'0.8rem',marginTop:'0.5rem',color:'#222'}}>
                      <strong>Resumen IA:</strong><br/>{
                        summary.replace(/\*([^*]+)\*/g, '<strong>$1</strong>')
                          ? <span dangerouslySetInnerHTML={{ __html: summary.replace(/\*([^*]+)\*/g, '<strong>$1</strong>') }} />
                          : summary
                      }
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <span style={{color:'#b00'}}>No hay apuntes disponibles para mostrar.</span>
        )}
      </div>
    </div>
  );
};

export default ResumenSection;
