// src/pages/Candidates.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import './Candidates.css'; // Import Candidates-specific CSS

const Candidates = () => {
  const { jobId } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const candidatesFromStorage = JSON.parse(localStorage.getItem('candidatesData')) || [];
    setCandidates(candidatesFromStorage.filter(candidate => candidate.jobId === jobId));
  }, [jobId]);

  const handleOpen = (candidate) => {
    setSelectedCandidate(candidate);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCandidate(null);
  };

  const handleSaveStatus = () => {
    const updatedCandidates = candidates.map(candidate =>
      candidate === selectedCandidate ? selectedCandidate : candidate
    );
    setCandidates(updatedCandidates);
    localStorage.setItem('candidatesData', JSON.stringify(updatedCandidates));
    handleClose();
  };

  return (
    <div className="candidates-container">
      <h2>Candidates for Job {jobId}</h2>
      <List>
        {candidates.map((candidate, index) => (
          <ListItem key={index} divider className="candidate-item">
            <ListItemText primary={candidate.name} secondary={`Status: ${candidate.status}`} />
            <Button variant="outlined" onClick={() => handleOpen(candidate)}>View Details</Button>
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Candidate Details</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="normal" value={selectedCandidate?.name || ''} disabled />
          <TextField label="Email" fullWidth margin="normal" value={selectedCandidate?.email || ''} disabled />
          <TextField
            label="Status"
            fullWidth
            margin="normal"
            value={selectedCandidate?.status || ''}
            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, status: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveStatus} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Candidates;
