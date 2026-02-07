import { useState } from 'react';

export default function AddMateriaModal({ open, onClose, onSubmit, error }) {
  const [form, setForm] = useState({
    nombre: '',
    codigo: '',
    descripcion: '',
    profesor: '',
    creditos: 0,
    semestre: '',
  });

  if (!open) return null;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(30, 41, 59, 0.35)',
      backdropFilter: 'blur(2px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '18px',
        boxShadow: '0 8px 32px 0 rgba(60,60,90,0.18)',
        padding: '2.2rem 2.5rem',
        minWidth: 340,
        maxWidth: 420,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}>
        <h2 style={{marginBottom:'1.2rem',color:'#3B82F6',fontWeight:700,fontSize:'1.35rem',textAlign:'center'}}>Agregar Materia</h2>
        {error && (
          <div style={{
            background:'#fff0f3',
            color:'#e94560',
            borderRadius:'8px',
            padding:'0.7rem 1rem',
            marginBottom:'1rem',
            fontSize:'1rem',
            textAlign:'center',
            border:'1px solid #ffd6e0'
          }}>{error}</div>
        )}
        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <label style={{fontWeight:500,color:'#222'}}>Nombre
            <input name="nombre" value={form.nombre} onChange={handleChange} required maxLength={200} style={{width:'100%',padding:'0.5rem',borderRadius:'8px',border:'1px solid #d1d5db',marginTop:'0.3rem',fontSize:'1rem'}} />
          </label>
          <label style={{fontWeight:500,color:'#222'}}>Código
            <input name="codigo" value={form.codigo} onChange={handleChange} maxLength={50} style={{width:'100%',padding:'0.5rem',borderRadius:'8px',border:'1px solid #d1d5db',marginTop:'0.3rem',fontSize:'1rem'}} />
          </label>
          <label style={{fontWeight:500,color:'#222'}}>Descripción
            <textarea name="descripcion" value={form.descripcion} onChange={handleChange} style={{width:'100%',padding:'0.5rem',borderRadius:'8px',border:'1px solid #d1d5db',marginTop:'0.3rem',fontSize:'1rem',minHeight:'60px'}} />
          </label>
          <label style={{fontWeight:500,color:'#222'}}>Profesor
            <input name="profesor" value={form.profesor} onChange={handleChange} maxLength={200} style={{width:'100%',padding:'0.5rem',borderRadius:'8px',border:'1px solid #d1d5db',marginTop:'0.3rem',fontSize:'1rem'}} />
          </label>
          <label style={{fontWeight:500,color:'#222'}}>Créditos
            <input name="creditos" type="number" min={0} value={form.creditos} onChange={handleChange} style={{width:'100%',padding:'0.5rem',borderRadius:'8px',border:'1px solid #d1d5db',marginTop:'0.3rem',fontSize:'1rem'}} />
          </label>
          <label style={{fontWeight:500,color:'#222'}}>Semestre
            <input name="semestre" value={form.semestre} onChange={handleChange} maxLength={50} style={{width:'100%',padding:'0.5rem',borderRadius:'8px',border:'1px solid #d1d5db',marginTop:'0.3rem',fontSize:'1rem'}} />
          </label>
          <div style={{marginTop:'1.2rem',display:'flex',gap:'1rem',justifyContent:'center'}}>
            <button type="submit" style={{background:'#3B82F6',color:'#fff',border:'none',borderRadius:'8px',padding:'0.7rem 2.2rem',fontSize:'1.08rem',fontWeight:600,boxShadow:'0 2px 8px #0001',cursor:'pointer'}}>Agregar</button>
            <button type="button" onClick={onClose} style={{background:'#e0e0ff',color:'#3B82F6',border:'none',borderRadius:'8px',padding:'0.7rem 2.2rem',fontSize:'1.08rem',fontWeight:600,boxShadow:'0 2px 8px #0001',cursor:'pointer'}}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
