const express = require('express');
const passport = require('passport');
const Raven = require('raven');
const router = express.Router();


router.post('/signup', (req, res, next) => {
  return passport.authenticate('signup', err => {
    if (err) {
      console.log("/signup auth: ", err)
      Raven.captureException(err);
      return res.status(400).json({
        success: false,
        message: err.message
      });
    } else {
      return res.json({
        success: true
      });
    }

  })(req, res, next);
})

router.post('/login', (req, res, next) => {
  return passport.authenticate('login', (err, token, userData) => {
    if (err) {
      Raven.captureException(err);
      return res.status(400).json({
        success: false,
        message: err.message
      });
    } else if (!token) {
      return res.status(400).json({
        success: false,
        message: userData.message
      });
    }

    userData.password = null;
    return res.json({
      success: true,
      token: token,
      user: userData
    });
  })(req, res, next);
})


module.exports = router;
