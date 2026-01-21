// Lista de temas de una materia
import React from 'react';

const TopicsList = ({ topics, onSelect, onEdit, onDelete }) => (
  <div className="topics-list">
    {topics.map((topic) => (
      <div key={topic.id} className="topic-card">
        <div className="topic-header">
          <h4>{topic.name}</h4>
        </div>
        <p>{topic.description}</p>
        <div className="topic-actions">
          <button onClick={() => onSelect(topic.id)}>Ver</button>
          <button onClick={() => onEdit(topic.id)}>Editar</button>
          <button onClick={() => onDelete(topic.id)}>Eliminar</button>
        </div>
      </div>
    ))}
  </div>
);

export default TopicsList;
