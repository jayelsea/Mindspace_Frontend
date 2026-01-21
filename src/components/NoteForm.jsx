// Formulario para crear/editar apunte
import React, { useState } from 'react';

const NoteForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <label>Título
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </label>
      <label>Contenido
        <textarea value={content} onChange={e => setContent(e.target.value)} rows={8} />
      </label>
      <div className="form-actions">
        <button type="submit">Guardar</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
};

export default NoteForm;
