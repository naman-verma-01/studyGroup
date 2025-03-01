import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography,
  Box 
} from '@mui/material';

function CreateStudyGroup() {
  const [group, setGroup] = useState({
    name: '',
    place: '',
    members: [],
    startTime: '',
    endTime: '',
    subject: ''
  });
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newGroup = {
      ...group,
      members: [currentUser.userId]
    };
    await axios.post('http://localhost:3001/studyGroups', newGroup);
    navigate('/groups');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create Study Group
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Group Name"
              variant="outlined"
              value={group.name}
              onChange={(e) => setGroup({...group, name: e.target.value})}
            />
            <TextField
              label="Location"
              variant="outlined"
              value={group.place}
              onChange={(e) => setGroup({...group, place: e.target.value})}
            />
            <TextField
              label="Subject"
              variant="outlined"
              value={group.subject}
              onChange={(e) => setGroup({...group, subject: e.target.value})}
            />
            <TextField
              label="Start Time"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={group.startTime}
              onChange={(e) => setGroup({...group, startTime: e.target.value})}
            />
            <TextField
              label="End Time"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={group.endTime}
              onChange={(e) => setGroup({...group, endTime: e.target.value})}
            />
            <Button variant="contained" type="submit" size="large">
              Create Group
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default CreateStudyGroup;