// src/pages/JobApplication.js
import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './JobApplication.css';

const JobApplication = () => {
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [candidate, setCandidate] = useState({
    name: '',
    email: '',
    resume: null,
    applicationDate: new Date().toLocaleDateString(),
    status: 'Under Review'
  });

  useEffect(() => {
    const jobsFromStorage = JSON.parse(localStorage.getItem('jobsData')) || [];
    setJobs(jobsFromStorage);
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCandidate({ name: '', email: '', resume: null, applicationDate: new Date().toLocaleDateString(), status: 'Under Review' });
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setCandidate({ ...candidate, resume: reader.result });
    reader.readAsDataURL(file);
  };

  const handleApply = () => {
    const candidates = JSON.parse(localStorage.getItem('candidatesData')) || [];
    const newCandidate = { ...candidate, jobId: selectedJob.id };
    localStorage.setItem('candidatesData', JSON.stringify([...candidates, newCandidate]));
    toast.success("Application submitted successfully!");
    handleClose();
  };

  return (
    <div className="job-application-container">
      <h1>Job Application</h1>
      <List>
        {jobs.map((job) => (
          <ListItem key={job.id}>
            <ListItemText primary={job.title} secondary={job.description} />
            <Button variant="outlined" onClick={() => handleApplyClick(job)}>Apply</Button>
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Apply for {selectedJob && selectedJob.title}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Name" fullWidth value={candidate.name} onChange={(e) => setCandidate({ ...candidate, name: e.target.value })} />
          <TextField margin="dense" label="Email" fullWidth value={candidate.email} onChange={(e) => setCandidate({ ...candidate, email: e.target.value })} />
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} style={{ marginTop: '20px' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleApply} color="primary">Submit Application</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default JobApplication;
