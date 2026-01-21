// Vista de mapa mental interactivo (placeholder)
import React from 'react';

const MindMapView = ({ data }) => {
  // Aquí podrías integrar una librería de mapas mentales o dibujar con SVG/Canvas
  return (
    <div className="mindmap-view">
      <h4>Mapa Mental</h4>
      <div className="mindmap-placeholder">
        {/* Aquí se renderizaría el mapa mental */}
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <span>Visualización gráfica próximamente...</span>
      </div>
    </div>
  );
};

export default MindMapView;
