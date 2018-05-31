const express = require('express');
const router = express.Router();

router.get('/me', (req, res) => {
  req.user.password = null;
  setTimeout(() => {
    res.status(200).json({
      success: 1,
      user: req.user
    });
  }, 2500);
})

module.exports = router;
