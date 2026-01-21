// Formulario para crear/editar materia
import React, { useState } from 'react';

const SubjectForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [name, setName] = useState(initialData.name || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [color, setColor] = useState(initialData.color || '#2196f3');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, color });
  };

  return (
    <form className="subject-form" onSubmit={handleSubmit}>
      <label>Nombre
        <input value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <label>Descripción
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      </label>
      <label>Color
        <input type="color" value={color} onChange={e => setColor(e.target.value)} />
      </label>
      <div className="form-actions">
        <button type="submit">Guardar</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
};

export default SubjectForm;
