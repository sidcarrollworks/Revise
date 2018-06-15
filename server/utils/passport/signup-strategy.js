const PassportLocalStrategy = require('passport-local').Strategy;
const Raven = require('raven');
const mongoose = require('mongoose');
const User = mongoose.model('Users');

const { JWT_SECRET } = require('../../../config');


module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  const { firstName, lastName, email, dateOfBirth, gender } = req.body;
  const userData = {
    firstName: firstName,
    lastName: lastName,
    username: username,
    defaultAvatar: `/don/${Math.floor(Math.random() * 12)}.jpeg`,
    email: email,
    password: password,
    dateOfBirth: dateOfBirth,
    gender: gender
  }

  const newUser = new User(userData);

  newUser.save((err, info) => {
    if (err) {
      Raven.captureException(err);
      console.log("signup-strategy", err);
      done(err);
    } else {
      done(null);
    }
  });

});
