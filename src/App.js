import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Teacher from './components/Teacher';
import Student from './components/Student';

const lightBackground = {
  backgroundColor: '#e6f0ff',
  color: '#333',
  backgroundImage: "url('https://t4.ftcdn.net/jpg/02/05/76/23/360_F_205762306_KCw2syVz457NVnZNQCgFdeWW0MRKqlt0.jpg')",
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  minHeight: '100vh',
  transition: 'all 0.5s ease',
  display: 'flex',
  flexDirection: 'column',
};

const darkBackground = {
  backgroundColor: '#121212',
  color: '#c0c0c0',
  backgroundImage: "url(https://www.clarkson.edu/sites/default/files/2023-06/Mathematics-Hero-1600x900.jpg)",
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  minHeight: '100vh',
  transition: 'all 0.5s ease',
  display: 'flex',
  flexDirection: 'column',
};

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const containerStyle = darkMode ? darkBackground : lightBackground;

  return (
    <Router>
      <div style={containerStyle}>
        <nav style={{
          padding: '10px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}>
          <div>
            <button style={{ backgroundColor: 'transparent', border: 'none', color: darkMode ? '#bb86fc' : '#fff', cursor: 'pointer', fontWeight: 'bold', fontStyle: 'italic', fontSize: '1.1rem', marginRight: '15px' }} onClick={() => window.location.href = '/teacher'}>Teacher</button>
            <button style={{ backgroundColor: 'transparent', border: 'none', color: darkMode ? '#bb86fc' : '#fff', cursor: 'pointer', fontWeight: 'bold', fontStyle: 'italic', fontSize: '1.1rem' }} onClick={() => window.location.href = '/student'}>Student</button>
          </div>
          <button
            onClick={toggleDarkMode}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: darkMode ? '#bb86fc' : '#1a237e',
              color: '#fff',
              fontWeight: 'bold',
              marginTop: '10px'
            }}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </nav>
        <main style={{ flexGrow: 1, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/teacher" />} />
            <Route path="/teacher" element={<Teacher darkMode={darkMode} />} />
            <Route path="/student" element={<Student darkMode={darkMode} />} />
          </Routes>
        </main>
        <footer style={{
          textAlign: 'center',
          padding: '10px 0',
          fontSize: '0.9rem',
          color: darkMode ? '#aaa' : '#555'
        }}>
          &copy; 2024 Educational Portal
        </footer>
      </div>
    </Router>
  );
}

export default App;
