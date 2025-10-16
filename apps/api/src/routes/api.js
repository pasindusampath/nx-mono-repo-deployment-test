const express = require('express');
const router = express.Router();
const { getItems, createItem } = require('../controllers/itemController');

router.get('/items', getItems);
router.post('/items', createItem);

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API',
    version: '1.0.0',
    endpoints: [
      'GET /api/items',
      'POST /api/items',
      'GET /health',
      'GET /health/ready'
    ]
  });
});

module.exports = router;

