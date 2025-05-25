import React, { useState } from 'react';

function Student() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  const [studentId, setStudentId] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/login/student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Invalid credentials');
        return res.json();
      })
      .then(data => {
        if (data.success) {
          setLoggedIn(true);
          setStudentId(data.studentId);
          fetchAttendanceStatus(data.studentId);
        }
      })
      .catch(err => alert(err.message));
  };

  const fetchAttendanceStatus = (id) => {
    fetch(`http://localhost:5000/api/attendance/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('No attendance record found');
        return res.json();
      })
      .then(data => {
        if (data.success) {
          setAttendanceStatus(data.attendance);
        }
      })
      .catch(err => {
        console.error('Error fetching attendance:', err);
        setAttendanceStatus('No record');
      });
  };

  if (!loggedIn) {
    return (
      <>
        <style>{`
          body {
            background: none !important;
            background-color: #fff !important;
          }
        `}</style>
        <div style={{
          maxWidth: '400px',
          margin: '50px auto',
          fontFamily: "'Arial', Helvetica, sans-serif",
          backgroundImage: "url('https://t4.ftcdn.net/jpg/02/05/76/23/360_F_205762306_KCw2syVz457NVnZNQCgFdeWW0MRKqlt0.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '40px',
          borderRadius: '15px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          color: '#333',
          textAlign: 'center',
          animation: 'fadeIn 1s ease-in-out'
        }}>
          <h2 style={{ marginBottom: '30px', fontWeight: 'bold', fontStyle: 'italic', fontSize: '2.5rem', color: '#222' }}>Student Login</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontWeight: 'bold', fontStyle: 'italic' }}>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="Name"
            style={{
              padding: '12px 20px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              outline: 'none',
              fontSize: '1.1rem',
              boxShadow: 'none',
              backgroundColor: '#fff',
              color: '#333',
              textAlign: 'left',
              fontWeight: 'bold',
              fontStyle: 'italic',
            }}
              onFocus={e => e.target.style.borderColor = '#4a90e2'}
              onBlur={e => e.target.style.borderColor = '#ccc'}
              autoComplete="username"
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Roll Number"
            style={{
              padding: '12px 20px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              outline: 'none',
              fontSize: '1.1rem',
              boxShadow: 'none',
              backgroundColor: '#fff',
              color: '#333',
              textAlign: 'left',
              fontWeight: 'bold',
              fontStyle: 'italic',
            }}
              onFocus={e => e.target.style.borderColor = '#4a90e2'}
              onBlur={e => e.target.style.borderColor = '#ccc'}
              autoComplete="current-password"
            />
            <button
              type="submit"
              style={{
                padding: '14px 0',
                borderRadius: '30px',
                border: 'none',
                background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                color: '#fff',
                fontWeight: '700',
                fontSize: '1.2rem',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(38, 115, 254, 0.6)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Login
            </button>
          </form>
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      </>
    );
  }

  return (
    <div style={{
      maxWidth: '400px',
      margin: '50px auto',
      fontFamily: "'Arial', Helvetica, sans-serif",
      backgroundColor: '#f9f9f9',
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      color: '#333',
      textAlign: 'center',
      animation: 'fadeIn 1s ease-in-out'
    }}>
      <h2 style={{ marginBottom: '30px', fontWeight: '700', fontSize: '2rem', color: '#222' }}>Your Attendance Status</h2>
      <p style={{ fontSize: '1.5rem' }}>
        {attendanceStatus === 'present' && <span style={{ color: '#4caf50' }}>Present</span>}
        {attendanceStatus === 'absent' && <span style={{ color: '#f44336' }}>Absent</span>}
        {attendanceStatus === 'leave' && <span style={{ color: '#ff9800' }}>On Leave</span>}
        {attendanceStatus === 'No record' && <span style={{ color: '#999' }}>No attendance record found</span>}
        {!attendanceStatus && <span>Loading...</span>}
      </p>
    </div>
  );
}

export default Student;
