const express = require('express');
const router = express.Router();

// Placeholder route to get all students
router.get('/', (req, res) => {
  res.json({ success: true, students: [] });
});

module.exports = router;
