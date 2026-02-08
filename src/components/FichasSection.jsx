import React, { useState } from 'react';
import QuizCard from './QuizCard';
import ChuletaModal from './ChuletaModal';

// FichasSection: muestra fichas de estudio tipo quiz por tema

const FichasSection = ({ materias, temas, fetchFichasIA }) => {
  const [temaFichas, setTemaFichas] = useState({}); // {temaId: [fichas]}
  const [loadingTema, setLoadingTema] = useState(null);
  const [errorTema, setErrorTema] = useState(null);
  const [showChuletaModal, setShowChuletaModal] = useState(false);
  const [chuletaFichas, setChuletaFichas] = useState([]);
  const [chuletaTema, setChuletaTema] = useState(null);

  // Genera fichas de estudio (palabras clave/características)
  const handleGenerarFichas = async (tema) => {
    setLoadingTema(tema.id);
    setErrorTema(null);
    setChuletaFichas([]);
    setChuletaTema(tema);
    try {
      // Llama a la IA para obtener 5 fichas clave del tema
      const fichas = await fetchFichasIA(tema);
      setChuletaFichas(Array.isArray(fichas) ? fichas.slice(0,5) : []);
      setShowChuletaModal(true);
    } catch (e) {
      setErrorTema('Error al generar fichas');
    } finally {
      setLoadingTema(null);
    }
  };

  return (
    <div className="fichas-section">
      <h1>Generar Fichas de Estudio</h1>
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
                  <div key={t.id} style={{minWidth:'260px',maxWidth:'340px'}}>
                    <div style={{fontWeight:'bold',fontSize:'1.05rem',marginBottom:'0.5rem'}}>{t.titulo || t.nombre}</div>
                    <button style={{background:'linear-gradient(135deg,#a8edea,#fed6e3)',border:'none',borderRadius:'4px',padding:'0.5rem 1.2rem',fontWeight:'bold',cursor:'pointer',marginBottom:'0.7rem'}} onClick={()=>handleGenerarFichas(t)} disabled={loadingTema===t.id}>
                      {loadingTema===t.id ? 'Generando...' : 'Generar Fichas'}
                    </button>
                    {errorTema && loadingTema===t.id && <div style={{color:'#b00'}}>{errorTema}</div>}
                    {/* Ya no se muestran quiz cards aquí, solo modal */}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}

      {/* Modal para chuleta */}
      <ChuletaModal
        open={showChuletaModal}
        fichas={chuletaFichas}
        tema={chuletaTema || {}}
        onClose={()=>setShowChuletaModal(false)}
      />
    </div>
  );
};

export default FichasSection;
