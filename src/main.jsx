
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { SupabaseProvider } from './contexts/SupabaseContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <SupabaseProvider>
      <App />
    </SupabaseProvider>
  </HelmetProvider>
);
