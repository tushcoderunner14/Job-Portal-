// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import './Navbar.css';

const Navbar = ({ darkMode, setDarkMode }) => (
  <AppBar position="static" className="navbar">
    <Toolbar>
      <Button color="inherit" component={Link} to="/">
        Dashboard
      </Button>
      <Button color="inherit" component={Link} to="/jobapp">
        Job Application
      </Button>
      <Button color="inherit" component={Link} to="/assessment">
        Assessment
      </Button>
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
    </Toolbar>
  </AppBar>
);

export default Navbar;
