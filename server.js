const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const attendanceRoutes = require('./routes/attendance');

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

// Use routes
app.use('/api/login', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
