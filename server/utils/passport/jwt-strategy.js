const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { JWT_SECRET } = require('../../../config');

const User = require('../../models/User.js');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
  issuer: 'revise.work'
}

module.exports = new JwtStrategy(opts, (token, done) => {
  User.findById(token.sub).exec().then(user => {
    if (user)
      return done(null, user);
    else
      return done(null, false);
  })
  .catch(err => {
    console.log("jwt-strategy", err);
    return done(err, false);
  });
});
