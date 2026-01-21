// Vista de detalle de un apunte
import React from 'react';

const NoteDetail = ({ note, onEdit, onDelete, onSummarize, onFlashcards, onExportPDF }) => (
  <div className="note-detail">
    <h3>{note.title}</h3>
    <div className="note-content">{note.content}</div>
    <div className="note-actions">
      <button onClick={onEdit}>Editar</button>
      <button onClick={onDelete}>Eliminar</button>
      <button onClick={onSummarize}>Generar resumen</button>
      <button onClick={onFlashcards}>Fichas de estudio</button>
      <button onClick={onExportPDF}>Exportar a PDF</button>
    </div>
  </div>
);

export default NoteDetail;
