import React, { useState } from 'react';
import './NoteForm.css';

export default function AddTemaModal({ open, onClose, onSubmit, materia }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    onSubmit({ nombre, descripcion, materia });
    setNombre('');
    setDescripcion('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Agregar Tema</h2>
        <form className="note-form styled-modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="tema-nombre">Nombre del tema</label>
            <input id="tema-nombre" className="input" value={nombre} onChange={e => setNombre(e.target.value)} required placeholder="Nombre del tema" />
          </div>
          <div className="form-group">
            <label htmlFor="tema-desc">Descripción</label>
            <textarea id="tema-desc" className="textarea" value={descripcion} onChange={e => setDescripcion(e.target.value)} rows={3} placeholder="Descripción breve (opcional)" />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">Guardar</button>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
