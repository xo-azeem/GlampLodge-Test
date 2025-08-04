import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { App } from './App';
// Set initial theme based on system preference
const setInitialTheme = () => {
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
};
// Execute before rendering
setInitialTheme();
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);