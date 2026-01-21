// Rutas principales de la app
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Dashboard';
import Login from '../Login';
import Register from '../Register';
import ProgressDashboard from './ProgressDashboard';
// Importar más vistas según se implementen

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/progreso" element={<ProgressDashboard globalStats={{subjects:0,topics:0,notes:0,progress:0}} subjectStats={[]} />} />
    {/* Agregar rutas para materia, tema, apunte, etc. */}
  </Routes>
);

export default AppRoutes;
