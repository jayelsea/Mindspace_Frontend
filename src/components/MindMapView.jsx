// Vista de mapa mental interactivo (placeholder)
import React from 'react';

const MindMapView = ({ data }) => {
  if (!data) return null;
  // Extraer nodos
  const nodoPrincipal = data.nodo_principal || 'Mapa Conceptual';
  const subnodos = Array.isArray(data.subnodos) ? data.subnodos : [];

  return (
    <div className="mindmap-view" style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'60vh'}}>
      <h4 style={{marginBottom:'2rem',color:'#3B82F6',textAlign:'center'}}>{nodoPrincipal}</h4>
      <div style={{display:'flex',flexDirection:'row',gap:'2rem',justifyContent:'center',alignItems:'stretch',flexWrap:'wrap',width:'100%'}}>
        {subnodos.map((sub, idx) => (
          <div key={idx} style={{border:'1px solid #ddd',borderRadius:'12px',padding:'1.5rem',background:'#f8faff',boxShadow:'0 2px 12px #0001',minWidth:'240px',maxWidth:'340px',flex:'1 1 240px',display:'flex',flexDirection:'column',alignItems:'center'}}>
            <div style={{fontWeight:'bold',fontSize:'1.18rem',marginBottom:'0.7rem',color:'#222',textAlign:'center'}}>{sub.titulo}</div>
            <div style={{fontSize:'1rem',color:'#555',marginBottom:'1rem',textAlign:'center'}}>{sub.descripcion}</div>
            <ul style={{paddingLeft:'0',marginBottom:0,listStyle:'disc',textAlign:'left',width:'100%'}}>
              {Array.isArray(sub.conceptos) && sub.conceptos.map((concepto, i) => (
                <li key={i} style={{fontSize:'0.97rem',color:'#444',marginBottom:'0.3rem'}}>{concepto}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MindMapView;
