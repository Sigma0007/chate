import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import ChatLayout from './components/ChatLayout';
import UserManagement from './components/UserManagement';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/users" element={<UserManagement />} />
          <Route path="/" element={<ChatLayout />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;