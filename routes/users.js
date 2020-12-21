const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/cool', function (req, res, next) {
  res.send('A mover el c00lo');
});

module.exports = router;
