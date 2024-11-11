// src/components/DarkModeToggle.js
import React from 'react';
import { Switch, Typography } from '@mui/material';
import '../styles/DarkMode.css'; // Import dark mode-specific styling (optional)

const DarkModeToggle = ({ darkMode, setDarkMode }) => (
  <div className="dark-mode-toggle">
    <Typography>Dark Mode</Typography>
    <Switch
      checked={darkMode}
      onChange={() => setDarkMode(!darkMode)}
      color="default"
    />
  </div>
);

export default DarkModeToggle;
