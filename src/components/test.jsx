import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography, Container, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@mui/material/MenuItem';


const App = () => {
  const [programs, setPrograms] = useState([]);
  const [newProgram, setNewProgram] = useState('');
  const [semesters, setSemesters] = useState('');
  const [currentSubjects, setCurrentSubjects] = useState('');
  const [subjects, setSubjects] = useState([]);

  const handleAddSubject = () => {
    if (currentSubjects) {
      setSubjects([...subjects, currentSubjects]);
      setCurrentSubjects('');
    }
  };

  const handleAddProgram = () => {
    if (newProgram && semesters && subjects.length > 0) {
      const newProgramDetails = {
        program: newProgram,
        semesters: semesters,
        subjects: subjects,
      };

      setPrograms([...programs, newProgramDetails]);
      setNewProgram('');
      setSemesters('');
      setSubjects([]);
    }
  };

  console.log(programs);

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Program Details
        </Typography>

        <TextField
          label="Program Name"
          fullWidth
          margin="normal"
          value={newProgram}
          onChange={(e) => setNewProgram(e.target.value)}
        />

        <TextField
          label="Number of Semesters"
          fullWidth
          margin="normal"
          type="number"
          value={semesters}
          onChange={(e) => setSemesters(e.target.value)}
        />

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={10}>
            <TextField
              label="Subjects in Semester"
              fullWidth
              margin="normal"
              value={currentSubjects}
              onChange={(e) => setCurrentSubjects(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton color="primary" onClick={handleAddSubject}>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>

        {subjects.map((subject, index) => (
          <Typography key={index} variant="body2" color="textSecondary">
            {subject}
          </Typography>
        ))}

        <Button variant="contained" color="primary" onClick={handleAddProgram}>
          Add Program
        </Button>

        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          {programs.map((program, index) => (
            <Grid item xs={4} key={index}>
              <Paper elevation={3} style={{ padding: '10px' }}>
                <Typography variant="h6" gutterBottom>
                  {program.program}
                </Typography>
                <Typography variant="body1">Semesters: {program.semesters}</Typography>
                <Typography variant="body1">Subjects: {program.subjects.join(', ')}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default App;