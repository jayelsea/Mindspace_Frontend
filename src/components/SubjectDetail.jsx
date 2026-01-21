// Vista detallada de una materia
import React from 'react';

const SubjectDetail = ({ subject, onEdit, onDelete, onAddTopic, children }) => (
  <div className="subject-detail" style={{ borderColor: subject.color }}>
    <h2>{subject.name}</h2>
    <p>{subject.description}</p>
    <div className="subject-progress-bar">
      <div className="progress" style={{ width: `${subject.progress}%`, background: subject.color }} />
    </div>
    <div className="subject-actions">
      <button onClick={onEdit}>Editar</button>
      <button onClick={onDelete}>Eliminar</button>
      <button onClick={onAddTopic}>Nuevo Tema</button>
    </div>
    {children}
  </div>
);

export default SubjectDetail;
