// src/App.js
import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Candidates from './pages/Candidates';
import Assessment from './pages/Assessment';
import JobApplication from './pages/JobApplication';
import { lightTheme, darkTheme } from './theme';
import './styles/App.css'; // Import global app styles

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const router = createBrowserRouter([
    { path: '/', element: <Dashboard /> },
    { path: '/candidates/:jobId', element: <Candidates /> },
    { path: '/assessment/:jobId', element: <Assessment /> },
    { path: '/jobapp', element: <JobApplication /> },
  ]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
