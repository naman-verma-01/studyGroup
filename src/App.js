import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from './components/Login';
import StudyGroupList from './components/StudyGroupList';
import CreateStudyGroup from './components/CreateStudyGroup';
import StudyGroupAnalytics from './components/StudyGroupAnalytics';
import Home from './components/Home';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/groups" element={<StudyGroupList />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create-group" element={<CreateStudyGroup />} />
            <Route path="/analytics/:groupId" element={<StudyGroupAnalytics />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;