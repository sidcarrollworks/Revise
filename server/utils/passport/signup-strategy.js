const PassportLocalStrategy = require('passport-local').Strategy;

const User = require('../../models/User.js');
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
    email: email,
    password: password,
    dateOfBirth: dateOfBirth,
    gender: gender
  }

  const newUser = new User(userData);

  newUser.save(err => {
    if (err) {
      console.log("signup-strategy", err);
      done(err);
    }
    done(null);
  });

});
