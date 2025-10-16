const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

router.get('/ready', (req, res) => {
  // Add any readiness checks here (database connections, etc.)
  res.json({
    status: 'ready',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;

