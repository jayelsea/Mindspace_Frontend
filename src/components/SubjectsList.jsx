// Lista de materias (Subjects)
import React from 'react';

const SubjectsList = ({ subjects, onSelect, onEdit, onDelete }) => (
  <div className="subjects-list">
    {subjects.map((subject) => (
      <div key={subject.id} className="subject-card" style={{ borderColor: subject.color }}>
        <div className="subject-header">
          <h3>{subject.name}</h3>
          <span className="subject-progress">{subject.progress}%</span>
        </div>
        <p>{subject.description}</p>
        <div className="subject-actions">
          <button onClick={() => onSelect(subject.id)}>Ver</button>
          <button onClick={() => onEdit(subject.id)}>Editar</button>
          <button onClick={() => onDelete(subject.id)}>Eliminar</button>
        </div>
      </div>
    ))}
  </div>
);

export default SubjectsList;
