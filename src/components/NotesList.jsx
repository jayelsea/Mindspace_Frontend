// Lista de apuntes de un tema
import React from 'react';

const NotesList = ({ notes, onSelect, onEdit, onDelete }) => (
  <div className="notes-list">
    {notes.map((note) => (
      <div key={note.id} className="note-card">
        <div className="note-header">
          <h5>{note.title}</h5>
          <span className="note-date">{note.date}</span>
        </div>
        <div className="note-preview">{note.preview}</div>
        <div className="note-actions">
          <button onClick={() => onSelect(note.id)}>Ver</button>
          <button onClick={() => onEdit(note.id)}>Editar</button>
          <button onClick={() => onDelete(note.id)}>Eliminar</button>
        </div>
      </div>
    ))}
  </div>
);

export default NotesList;
