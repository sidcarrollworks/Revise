const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Raven = require('raven');

const { JWT_SECRET } = require('../../../config');

const mongoose = require('mongoose');
const User = mongoose.model('Users');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
  issuer: 'revise.work'
}

module.exports = new JwtStrategy(opts, (token, done) => {
  User.findById(token.sub).exec().then(user => {
    if (user)
      done(null, user);
    else
      done(null, false);
  })
  .catch(err => {
    Raven.captureException(err);
    console.log("jwt-strategy", err);
    done(err, false);
  });
});
