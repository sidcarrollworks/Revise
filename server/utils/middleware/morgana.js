const morgan = require("morgan");

module.exports = function(req, res, next) {
  const url = req.originalUrl;
  // morgan("^-------______-------^")(req, res, next);
  // Morgan logger //
  
  // morgan(':user-agent')(req, res, next);
  // morgan('[:date[clf]]')(req, res, next);
  // morgan('":method | :url | HTTP/:http-version"')(req, res, next);
  // morgan(':status | :res[content-length] | :response-time ms')(req, res, next);
  // morgan('........................................')(req, res, next);
  // morgan(' ')(req, res, next);
  next();
} 
