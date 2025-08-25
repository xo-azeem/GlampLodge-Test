import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { LoadingSpinner } from './components/LoadingSpinner';

// Set initial theme based on system preference
const setInitialTheme = () => {
  try {
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      return;
    }
    // Check for system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch (error) {
    console.warn('Could not set theme:', error);
    // Fallback to light theme
    document.documentElement.setAttribute('data-theme', 'light');
  }
};

// Execute before rendering
setInitialTheme();

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found');
}

try {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  // Fallback rendering
  container.innerHTML = `
    <div style="
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 20px;
    ">
      <div>
        <h1 style="font-size: 2rem; margin-bottom: 1rem;">GlampLodges</h1>
        <p style="margin-bottom: 1rem;">Something went wrong while loading the app.</p>
        <button 
          onclick="window.location.reload()"
          style="
            padding: 10px 20px;
            background: white;
            color: #667eea;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
          "
        >
          Refresh Page
        </button>
      </div>
    </div>
  `;
}