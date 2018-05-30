const jwt = require('jsonwebtoken');
const PassportLocalStrategy = require('passport-local').Strategy;

const User = require('../../models/User.js');
const { JWT_SECRET } = require('../../../config');


module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false
}, (username, password, done) => {

  // find a user by email address
  return User.findOne({ username: username }).exec()
    // check for user
    .then(user => {
      if (user)
        return user;
      else
        return done(new Error('Incorrect email or password'));
    })
    //check for password
    .then(user => {
      if (user.validPassword(password))
        return user;
      else
        return done(new Error('Incorrect email or password'));
    })
    // sign and return token
    .then(user => {
      const token = jwt.sign({ sub: user._id }, JWT_SECRET, {
        expiresIn: "7d",
        issuer: 'revise.work'
      });
      return done(null, token, user);
    })
    // catch any errors
    .catch(err => {
      console.log("Login-Strategy:", err);
      return done(err);
    });

  });
