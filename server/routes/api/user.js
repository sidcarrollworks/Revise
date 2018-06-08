const express = require('express');
const router = express.Router();

router.get('/me', (req, res) => {
  req.user.password = null;
  setTimeout(() => {
    res.status(200).json({
      success: true,
      user: req.user
    });
  }, Math.floor(Math.random() * 2400) + 800);
})

module.exports = router;
