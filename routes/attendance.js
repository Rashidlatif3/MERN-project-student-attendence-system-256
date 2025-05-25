const express = require('express');
const router = express.Router();

// Placeholder route to get attendance records
router.get('/', (req, res) => {
  res.json({ success: true, attendance: [] });
});

module.exports = router;
