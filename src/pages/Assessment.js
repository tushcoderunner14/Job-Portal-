// src/pages/Assessment.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import './Assessment.css'; // Import Assessment-specific CSS

const AssessmentPage = () => {
  const { jobId } = useParams();
  const [jobs, setJobs] = useState([]);
  const [jobQuestions, setJobQuestions] = useState([]);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState({ optionA: '', optionB: '', optionC: '', optionD: '' });
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const jobsFromStorage = JSON.parse(localStorage.getItem('jobsData')) || [];
    setJobs(jobsFromStorage);
    const questions = JSON.parse(localStorage.getItem(`job_${jobId}_questions`)) || [];
    setJobQuestions(questions);
  }, [jobId]);

  const handleAddOrUpdateQuestion = () => {
    const newQuestion = { question, options, correctAnswer };
    let updatedQuestions;
    if (editIndex !== null) {
      updatedQuestions = [...jobQuestions];
      updatedQuestions[editIndex] = newQuestion;
      setEditIndex(null);
    } else {
      updatedQuestions = [...jobQuestions, newQuestion];
    }
    localStorage.setItem(`job_${jobId}_questions`, JSON.stringify(updatedQuestions));
    setJobQuestions(updatedQuestions);
    setQuestion('');
    setOptions({ optionA: '', optionB: '', optionC: '', optionD: '' });
    setCorrectAnswer('');
  };

  const handleEditQuestion = (index) => {
    const questionToEdit = jobQuestions[index];
    setQuestion(questionToEdit.question);
    setOptions(questionToEdit.options);
    setCorrectAnswer(questionToEdit.correctAnswer);
    setEditIndex(index);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = jobQuestions.filter((_, i) => i !== index);
    localStorage.setItem(`job_${jobId}_questions`, JSON.stringify(updatedQuestions));
    setJobQuestions(updatedQuestions);
  };

  return (
    <div className="assessment-container">
      <h1>Assessment Page</h1>
      <FormControl fullWidth>
        <InputLabel>Select Job</InputLabel>
        <Select value={jobId} onChange={(e) => navigate(`/assessment/${e.target.value}`)}>
          {jobs.map((job) => (
            <MenuItem key={job.id} value={job.id}>{job.title}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className="question-form">
        <TextField label="Question" fullWidth value={question} onChange={(e) => setQuestion(e.target.value)} margin="normal" />
        <TextField label="Option A" name="optionA" value={options.optionA} onChange={(e) => setOptions({ ...options, optionA: e.target.value })} fullWidth margin="normal" />
        <TextField label="Option B" name="optionB" value={options.optionB} onChange={(e) => setOptions({ ...options, optionB: e.target.value })} fullWidth margin="normal" />
        <TextField label="Option C" name="optionC" value={options.optionC} onChange={(e) => setOptions({ ...options, optionC: e.target.value })} fullWidth margin="normal" />
        <TextField label="Option D" name="optionD" value={options.optionD} onChange={(e) => setOptions({ ...options, optionD: e.target.value })} fullWidth margin="normal" />
        <TextField label="Correct Answer" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} fullWidth margin="normal" />

        <Button onClick={handleAddOrUpdateQuestion} variant="contained" color="primary">
          {editIndex !== null ? 'Update Question' : 'Add Question'}
        </Button>
      </div>

      <div className="existing-questions">
        <h3>Existing Questions</h3>
        {jobQuestions.map((q, index) => (
          <div key={index} className="question-item">
            <p>{q.question}</p>
            <ul>
              <li>A: {q.options.optionA}</li>
              <li>B: {q.options.optionB}</li>
              <li>C: {q.options.optionC}</li>
              <li>D: {q.options.optionD}</li>
            </ul>
            <p>Correct Answer: {q.correctAnswer}</p>
            <Button onClick={() => handleEditQuestion(index)} variant="outlined" color="primary">Edit</Button>
            <Button onClick={() => handleDeleteQuestion(index)} variant="outlined" color="secondary" style={{ marginLeft: '10px' }}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentPage;
