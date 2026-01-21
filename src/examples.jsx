// Entrada para ver ejemplos visuales
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ExamplesShowcase from './components/ExamplesShowcase';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ExamplesShowcase />
  </React.StrictMode>
);
