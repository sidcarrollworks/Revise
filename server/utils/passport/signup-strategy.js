const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;

const { JWT_SECRET } = require('../../config');


module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {

  const userData = {
    username: username,
    password: password
  }

  const newUser = new User(userData);

  newUser.save(err => {
    if (err) {
      console.log("signup-strategy", err);
      return done(err);
    }
    return done(null);
  });

});
