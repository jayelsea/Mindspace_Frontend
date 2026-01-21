// Ejemplo visual de materias y estadísticas
import React from 'react';
import SubjectsList from './SubjectsList';
import ProgressDashboard from './ProgressDashboard';

const exampleSubjects = [
  { id: 1, name: 'Matemáticas', description: 'Álgebra, Cálculo y Geometría', color: '#1976d2', progress: 80 },
  { id: 2, name: 'Programación', description: 'Python, Algoritmos y Estructuras', color: '#43a047', progress: 60 },
  { id: 3, name: 'Física', description: 'Mecánica y Termodinámica', color: '#fbc02d', progress: 35 },
  { id: 4, name: 'Historia', description: 'Historia Universal y de América', color: '#e53935', progress: 90 },
];

const exampleGlobalStats = {
  subjects: 4,
  topics: 12,
  notes: 34,
  progress: 66,
};

const exampleSubjectStats = [
  { id: 1, name: 'Matemáticas', progress: 80 },
  { id: 2, name: 'Programación', progress: 60 },
  { id: 3, name: 'Física', progress: 35 },
  { id: 4, name: 'Historia', progress: 90 },
];

const ExamplesShowcase = () => (
  <div style={{ padding: 32 }}>
    <h2>Ejemplo de Materias</h2>
    <SubjectsList
      subjects={exampleSubjects}
      onSelect={() => {}}
      onEdit={() => {}}
      onDelete={() => {}}
    />
    <h2 style={{ marginTop: 40 }}>Ejemplo de Progreso</h2>
    <ProgressDashboard globalStats={exampleGlobalStats} subjectStats={exampleSubjectStats} />
  </div>
);

export default ExamplesShowcase;
