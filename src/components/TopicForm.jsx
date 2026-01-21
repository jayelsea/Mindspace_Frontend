// Formulario para crear/editar tema
import React, { useState } from 'react';

const TopicForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [name, setName] = useState(initialData.name || '');
  const [description, setDescription] = useState(initialData.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description });
  };

  return (
    <form className="topic-form" onSubmit={handleSubmit}>
      <label>Nombre
        <input value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <label>Descripción
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      </label>
      <div className="form-actions">
        <button type="submit">Guardar</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
};

export default TopicForm;
