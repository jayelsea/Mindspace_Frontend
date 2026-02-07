// Formulario para crear/editar apunte
import React, { useState } from 'react';
import './NoteForm.css';

const NoteForm = ({ onSubmit, initialData = {}, onCancel, temas = [], allowTemaSelect = false }) => {
  const [title, setTitle] = useState(initialData.title || initialData.titulo || '');
  const [content, setContent] = useState(initialData.content || initialData.contenido || '');
  const [temaId, setTemaId] = useState(initialData.tema || (temas[0] && temas[0].id) || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, tema: temaId });
  };

  return (
    <form className="note-form styled-modal-form" onSubmit={handleSubmit}>
      {allowTemaSelect && (
        <div className="form-group">
          <label htmlFor="note-tema">Tema</label>
          {temas.length > 0 ? (
            <select id="note-tema" className="input" value={temaId} onChange={e => setTemaId(e.target.value)} required>
              {temas.map(t => (
                <option key={t.id} value={t.id}>{t.titulo || t.nombre}</option>
              ))}
            </select>
          ) : (
            <div style={{color:'#b00',fontSize:'0.98rem',marginTop:'0.5rem'}}>No hay temas disponibles para esta materia.</div>
          )}
        </div>
      )}
      <div className="form-group">
        <label htmlFor="note-title">Título</label>
        <input id="note-title" className="input" value={title} onChange={e => setTitle(e.target.value)} required placeholder="Título del apunte" />
      </div>
      <div className="form-group">
        <label htmlFor="note-content">Contenido</label>
        <textarea id="note-content" className="textarea" value={content} onChange={e => setContent(e.target.value)} rows={7} placeholder="Escribe el contenido aquí..." />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-primary">Guardar</button>
        {onCancel && <button type="button" className="btn-secondary" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
};

export default NoteForm;
