import React from 'react';

// ChuletaModal: muestra fichas clave de aprendizaje estilo "chuleta para examen"
const ChuletaModal = ({ open, fichas, tema, onClose }) => {
  if (!open) return null;

  // Paleta de colores difuminados
  const colors = [
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)',
    'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
    'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
  ];

  return (
    <div className="modal-overlay" style={{zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div className="modal-content" style={{maxWidth:'600px',width:'90vw',maxHeight:'80vh',padding:'2rem',position:'relative',overflow:'hidden',background:'#fff',borderRadius:'16px',boxShadow:'0 4px 32px #0002'}}>
        <button onClick={onClose} style={{position:'absolute',top:'1rem',right:'1rem',background:'#eee',border:'none',borderRadius:'50%',width:'2rem',height:'2rem',fontWeight:'bold',cursor:'pointer'}}>✕</button>
        <h2 style={{marginBottom:'1.5rem',textAlign:'center'}}>Chuleta para examen: {tema.titulo || tema.nombre}</h2>
        <div style={{display:'flex',flexDirection:'column',gap:'1.2rem',overflowY:'auto',maxHeight:'60vh'}}>
          {fichas.map((ficha, idx) => (
            <div key={idx} style={{
              background: colors[idx % colors.length],
              borderRadius:'12px',
              padding:'1.2rem',
              boxShadow:'0 2px 8px #0001',
              color:'#222',
              fontWeight:'bold',
              fontSize:'1.08rem',
              minHeight:'60px',
              display:'flex',
              flexDirection:'column',
              alignItems:'flex-start',
              justifyContent:'center'
            }}>
              {ficha.pregunta && (
                <div style={{fontWeight:'bold',marginBottom:'0.5rem'}}>❓ {ficha.pregunta}</div>
              )}
              {ficha.respuesta && (
                <div style={{fontWeight:'normal',color:'#333'}}>💡 {ficha.respuesta}</div>
              )}
              {!ficha.pregunta && !ficha.respuesta && (ficha.texto || ficha.palabra || ficha.caracteristica || ficha)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChuletaModal;
