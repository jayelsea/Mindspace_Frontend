// Dashboard de progreso global y por materia
import React from 'react';

const ProgressDashboard = ({ globalStats, subjectStats }) => (
  <div className="progress-dashboard">
    <div className="global-progress">
      <h2>Progreso General</h2>
      <div className="stats-cards">
        {/* Ejemplo de tarjetas de estadísticas */}
        <div className="stat-card">Materias: {globalStats.subjects}</div>
        <div className="stat-card">Temas: {globalStats.topics}</div>
        <div className="stat-card">Apuntes: {globalStats.notes}</div>
        <div className="stat-card">Avance: {globalStats.progress}%</div>
      </div>
    </div>
    <div className="subjects-progress">
      <h3>Progreso por Materia</h3>
      <div className="subjects-list">
        {subjectStats.map((s) => (
          <div key={s.id} className="subject-progress-card">
            <span>{s.name}</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${s.progress}%` }} />
            </div>
            <span>{s.progress}%</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ProgressDashboard;
