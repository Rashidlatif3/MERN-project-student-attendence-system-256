const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Student = require('./models/Student');
const Attendance = require('./models/Attendance');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/attendance-portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Test endpoint to verify backend connectivity
app.get('/api/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ success: true, message: 'Backend is reachable' });
});

// Auth routes
app.post('/api/login/teacher', (req, res) => {
  const { username, password } = req.body;
  console.log('Teacher login attempt:', { username, password });
  if (username === 'teacher' && password === '1234') {
    res.json({ success: true, role: 'teacher' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/login/student', async (req, res) => {
  const { name, password } = req.body;
  try {
    const student = await Student.findOne({ name });
    if (!student) {
      return res.status(401).json({ success: false, message: 'Student not found' });
    }
    if (student.rollNumber === password) {
      res.json({ success: true, role: 'student', studentId: student._id });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Student routes
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.json(newStudent);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Attendance routes
app.post('/api/attendance', async (req, res) => {
  const { attendance } = req.body;
  try {
    for (const record of attendance) {
      const newAttendance = new Attendance(record);
      await newAttendance.save();
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving attendance' });
  }
});

app.get('/api/attendance/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const latestAttendance = await Attendance.findOne({ studentId }).sort({ date: -1 });
    if (!latestAttendance) {
      return res.status(404).json({ success: false, message: 'No attendance record found' });
    }
    res.json({ success: true, attendance: latestAttendance.status });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
