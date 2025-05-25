import React, { useState, useEffect } from 'react';

function Teacher() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [attendanceSheetUrl, setAttendanceSheetUrl] = useState('');

  useEffect(() => {
    if (loggedIn) {
      fetch('http://localhost:5000/api/students')
        .then(res => res.json())
        .then(data => setStudents(data))
        .catch(err => console.error('Error fetching students:', err));
    }
  }, [loggedIn]);

  const handleAddStudent = (e) => {
    e.preventDefault();
    const newStudent = { name, rollNumber };

    fetch('http://localhost:5000/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent),
    })
      .then(res => res.json())
      .then(data => {
        setStudents([...students, data]);
        setName('');
        setRollNumber('');
      })
      .catch(err => console.error('Error adding student:', err));
  };

  const handleAttendanceChange = (index, status) => {
    const updatedStudents = [...students];
    updatedStudents[index].attendance = status;
    setStudents(updatedStudents);
  };

  const handleSaveAttendance = () => {
    // Prepare attendance data to send to backend
    const attendanceData = students.map(student => ({
      studentId: student._id || student.id,
      status: student.attendance || 'present',
    }));

    fetch('http://localhost:5000/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ attendance: attendanceData }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to save attendance');
        return res.json();
      })
      .then(data => {
        alert('Attendance saved successfully');
      })
      .catch(err => {
        console.error('Error saving attendance:', err);
        alert('Error saving attendance');
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
fetch('http://localhost:5000/api/login/teacher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Invalid credentials');
        return res.json();
      })
      .then(data => {
        if (data.success) {
          setLoggedIn(true);
        }
      })
      .catch(err => alert(err.message));
  };

  const handleDownloadAttendance = () => {
    alert('Download attendance functionality is not implemented yet.');
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
        fontFamily: "'Georgia', serif",
        backgroundImage: "url('https://t4.ftcdn.net/jpg/02/05/76/23/360_F_205762306_KCw2syVz457NVnZNQCgFdeWW0MRKqlt0.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 8px 16px rgba(248, 248, 248, 0.1)',
        color: '#000000',
        textAlign: 'center',
        animation: 'fadeIn 1s ease-in-out',
      }}>
          <h1 style={{
            marginBottom: '30px',
            fontWeight: 'bold',
            fontStyle: 'italic',
            fontSize: '2.5rem',
            color: '#000000',
            textShadow: '0 0 10px #ffffff, 0 0 20px #ffffff',
            animation: 'glow 1.5s ease-in-out infinite alternate'
          }}>Teacher Login</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontWeight: 'bold', fontStyle: 'italic' }}>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              placeholder="Username"
              style={{
                padding: '12px 20px',
                borderRadius: '12px',
                border: '1px solid #000000',
                outline: 'none',
                fontSize: '1.1rem',
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                boxShadow: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#000000',
                textAlign: 'left',
                animation: 'fadeInInput 1s ease forwards',
                fontWeight: 'bold',
                fontStyle: 'italic',
              }}
              onFocus={e => {
                e.target.style.borderColor = '#000000';
                e.target.style.boxShadow = '0 0 8px 2px #ffffff';
              }}
              onBlur={e => {
                e.target.style.borderColor = '#000000';
                e.target.style.boxShadow = 'none';
              }}
              autoComplete="username"
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Password"
              style={{
                padding: '12px 20px',
                borderRadius: '12px',
                border: '1px solid #000000',
                outline: 'none',
                fontSize: '1.1rem',
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                boxShadow: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#000000',
                textAlign: 'left',
                animation: 'fadeInInput 1.2s ease forwards',
                fontWeight: 'bold',
                fontStyle: 'italic',
              }}
              onFocus={e => {
                e.target.style.borderColor = '#000000';
                e.target.style.boxShadow = '0 0 8px 2px #ffffff';
              }}
              onBlur={e => {
                e.target.style.borderColor = '#000000';
                e.target.style.boxShadow = 'none';
              }}
              autoComplete="current-password"
            />
            <button
              type="submit"
              style={{
                padding: '14px 0',
                borderRadius: '30px',
                border: 'none',
                background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
                color: '#fff',
                fontWeight: '700',
                fontSize: '1.2rem',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(255, 255, 255, 0.6)',
                transition: 'transform 0.3s ease',
                animation: 'fadeInButton 1.4s ease forwards',
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
            @keyframes glow {
              from { text-shadow: 0 0 10px #ffffff, 0 0 20px #ffffff; }
              to { text-shadow: 0 0 20px #ffffff, 0 0 30px #ffffff; }
            }
            @keyframes fadeInInput {
              from { opacity: 0; transform: translateX(-20px); }
              to { opacity: 1; transform: translateX(0); }
            }
            @keyframes fadeInButton {
              from { opacity: 0; transform: scale(0.8); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      </>
    );
  }

  return (
      <div style={{ maxWidth: '800px', margin: '20px auto', fontFamily: "'Georgia', serif" }}>
        <h2 style={{ fontWeight: 'bold', fontStyle: 'italic', color: '#fff' }}>Teacher Portal</h2>
        <div>
          <h3 style={{ fontWeight: 'bold', fontStyle: 'italic', color: '#fff' }}>Add Student</h3>
        <form onSubmit={handleAddStudent}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={{ marginRight: '10px', padding: '8px' }}
          />
          <input
            type="text"
            placeholder="Roll Number"
            value={rollNumber}
            onChange={e => setRollNumber(e.target.value)}
            required
            style={{ marginRight: '10px', padding: '8px' }}
          />
          <button type="submit" style={{ padding: '8px 16px' }}>Add Student</button>
        </form>
      </div>
      <div>
        <h3>Attendance Sheet</h3>
        <table style={{
          width: '100%',
          marginTop: '10px',
          borderCollapse: 'collapse',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#4a90e2', color: '#fff' }}>
              <th style={{ padding: '12px 15px', border: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '12px 15px', border: '1px solid #ddd' }}>Roll Number</th>
              <th style={{ padding: '12px 15px', border: '1px solid #ddd' }}>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd', backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                <td style={{ padding: '12px 15px', border: '1px solid #ddd' }}>{student.name}</td>
                <td style={{ padding: '12px 15px', border: '1px solid #ddd' }}>{student.rollNumber}</td>
                <td style={{ padding: '12px 15px', border: '1px solid #ddd' }}>
                  <select
                    value={student.attendance || 'present'}
                    onChange={(e) => handleAttendanceChange(index, e.target.value)}
                    style={{ padding: '6px', borderRadius: '6px' }}
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="leave">Leave</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleSaveAttendance} style={{ marginTop: '10px', padding: '8px 16px' }}>
          Save Attendance
        </button>
      </div>
    </div>
  );
}

export default Teacher;
