// Buffer polyfill for bip39 (requires Node.js Buffer in browser)
import { Buffer } from 'buffer';
globalThis.Buffer = Buffer;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useThemeStore from './store/useThemeStore';
import App from './App.jsx';
import './index.css';

// Initialize theme before first render
useThemeStore.getState().initTheme();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        gutter={10}
        toastOptions={{
          duration: 3500,
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderLeft: '4px solid #3b82f6',
            borderRadius: '12px',
            fontSize: '0.875rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: '500',
            padding: '14px 18px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(59, 130, 246, 0.15)',
            maxWidth: '380px',
            lineHeight: '1.5',
            backdropFilter: 'blur(12px)',
          },
          success: {
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              border: '1px solid rgba(74, 222, 128, 0.2)',
              borderLeft: '4px solid #4ade80',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(74, 222, 128, 0.15)',
            },
            iconTheme: {
              primary: '#4ade80',
              secondary: '#1e293b',
            },
          },
          error: {
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              border: '1px solid rgba(248, 113, 113, 0.2)',
              borderLeft: '4px solid #f87171',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(248, 113, 113, 0.15)',
            },
            iconTheme: {
              primary: '#f87171',
              secondary: '#1e293b',
            },
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>
);
