import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';

function Login() {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3001/users/${userId}`);
      if (response.data) {
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        navigate('/groups');
      }
    } catch (error) {
        console.log('error', error)
      alert('Invalid user ID');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Study Groups Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="User ID"
            variant="outlined"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            size="large"
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;