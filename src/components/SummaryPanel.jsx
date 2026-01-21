// Panel lateral para mostrar resumen generado
import React from 'react';

const SummaryPanel = ({ summary, onClose }) => (
  <div className="summary-panel">
    <button className="close-btn" onClick={onClose}>×</button>
    <h4>Resumen automático</h4>
    <div className="summary-content">{summary}</div>
  </div>
);

export default SummaryPanel;
