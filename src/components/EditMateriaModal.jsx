import { useState, useEffect } from 'react';

export default function EditMateriaModal({ open, onClose, onSubmit, materia }) {
  const [form, setForm] = useState({
    nombre: '',
    codigo: '',
    descripcion: '',
    profesor: '',
    creditos: 0,
    semestre: '',
  });

  useEffect(() => {
    if (materia) setForm({ ...materia });
  }, [materia]);

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
      background: 'rgba(0,0,0,0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        padding: '2rem',
        minWidth: '340px',
        maxWidth: '95vw',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        border: '1px solid #e0e0e0'
      }}>
        <h2 style={{marginBottom:'1.5rem', color:'#333'}}>Editar Materia</h2>
        <form onSubmit={handleSubmit}>
          <label style={{display:'block',marginBottom:'1rem',color:'#555'}}>Nombre
            <input name="nombre" value={form.nombre} onChange={handleChange} required maxLength={200}
              style={{width:'100%',padding:'0.5rem',borderRadius:'6px',border:'1px solid #ccc',marginTop:'0.3rem'}} />
          </label>
          <label style={{display:'block',marginBottom:'1rem',color:'#555'}}>Código
            <input name="codigo" value={form.codigo} onChange={handleChange} maxLength={50}
              style={{width:'100%',padding:'0.5rem',borderRadius:'6px',border:'1px solid #ccc',marginTop:'0.3rem'}} />
          </label>
          <label style={{display:'block',marginBottom:'1rem',color:'#555'}}>Descripción
            <textarea name="descripcion" value={form.descripcion} onChange={handleChange}
              style={{width:'100%',padding:'0.5rem',borderRadius:'6px',border:'1px solid #ccc',marginTop:'0.3rem',minHeight:'60px'}} />
          </label>
          <label style={{display:'block',marginBottom:'1rem',color:'#555'}}>Profesor
            <input name="profesor" value={form.profesor} onChange={handleChange} maxLength={200}
              style={{width:'100%',padding:'0.5rem',borderRadius:'6px',border:'1px solid #ccc',marginTop:'0.3rem'}} />
          </label>
          <label style={{display:'block',marginBottom:'1rem',color:'#555'}}>Créditos
            <input name="creditos" type="number" min={0} value={form.creditos} onChange={handleChange}
              style={{width:'100%',padding:'0.5rem',borderRadius:'6px',border:'1px solid #ccc',marginTop:'0.3rem'}} />
          </label>
          <label style={{display:'block',marginBottom:'1rem',color:'#555'}}>Semestre
            <input name="semestre" value={form.semestre} onChange={handleChange} maxLength={50}
              style={{width:'100%',padding:'0.5rem',borderRadius:'6px',border:'1px solid #ccc',marginTop:'0.3rem'}} />
          </label>
          <div style={{marginTop:'1.5rem',display:'flex',justifyContent:'flex-end'}}>
            <button type="submit" style={{
              background:'#1976d2',
              color:'#fff',
              border:'none',
              borderRadius:'6px',
              padding:'0.6rem 1.4rem',
              fontWeight:'bold',
              cursor:'pointer',
              boxShadow:'0 2px 8px rgba(25,118,210,0.08)'
            }}>Guardar</button>
            <button type="button" onClick={onClose} style={{
              marginLeft:'1rem',
              background:'#f5f5f5',
              color:'#333',
              border:'1px solid #ccc',
              borderRadius:'6px',
              padding:'0.6rem 1.4rem',
              fontWeight:'bold',
              cursor:'pointer'
            }}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
