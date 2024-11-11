// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import './Dashboard.css'; // Import Dashboard-specific CSS

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const jobsFromStorage = JSON.parse(localStorage.getItem('jobsData')) || [];
    setJobs(jobsFromStorage);
  }, []);

  return (
    <div className="dashboard-container">
      <Typography variant="h4" className="dashboard-title">Job Dashboard</Typography>
      {jobs.map((job) => (
        <Paper key={job.id} className="job-card">
          <Typography variant="h6">{job.title}</Typography>
          <Typography variant="body2">{job.description}</Typography>
          <Button variant="contained">View Candidates</Button>
        </Paper>
      ))}
    </div>
  );
};

export default Dashboard;
