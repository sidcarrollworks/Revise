const { JWT_SECRET } = require('../../../config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('Users');
const Raven = require('raven');

module.exports = (socket, next) => {
  let manErr = new Error('Authentication error')
  if (socket.handshake.query && socket.handshake.query.token)
    jwt.verify(socket.handshake.query.token, JWT_SECRET, {issuer: 'revise.work'}, (err, token) => {
      if(err) 
        next(manErr);
      else
        User.findById(token.sub).exec()
          .then(user => {
            if (!user) {
              next(manErr);
            } else {
              socket.userInfo = user;
              next();
            }
          })
          .catch(err => {
            Raven.captureException(err);
            console.log("socket IO auth: ", err);
            next(manErr);
          });
    });
  else
    next(manErr);
}
