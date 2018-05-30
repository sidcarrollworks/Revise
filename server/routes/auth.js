const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/signup', (req, res, next) => {
  return passport.authenticate('signup', err => {
    if (err)
      return res.status(400).json({
        success: false,
        message: err.message
      });

    return res.json({
      success: true
    });
  })(req, res, next);
})

router.post('/login', (req, res, next) => {
  return passport.authenticate('login', (err, token, data) => {
    if (err)
      return res.status(400).json({
        success: false,
        message: err.message
      });

    return res.json({
      success: true,
      token: token,
      user: data
    });
  })(req, res, next);
})




module.exports = router;
