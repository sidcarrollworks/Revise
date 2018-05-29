const bodyParser = require('body-parser');
const passport   = require('passport');
const express    = require('express');
const morgan     = require("morgan");
const path       = require('path');

// importing custom middleware
// const morgana = require("./middleware/morgana.js");

// importing routes
// const api = require("./routes/api");
const auth = require("./routes/auth.js");

// init app
const app = express();

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Initialize passport
app.use(passport.initialize());
// load passport strategies
const SignupStrategy = require('./utils/passport/login-strategy.js');
const LoginStrategy = require('./utils/passport/login-strategy.js');
const jwtStrategy = require('./utils/passport/jwt-strategy.js')
passport.use('signup', SignupStrategy);
passport.use('login', LoginStrategy);
passport.use('jwt', jwtStrategy);

// app.use(morgana)
// Morgan logger //

app.use(morgan(':user-agent'));
app.use(morgan('[:date[clf]]'));
app.use(morgan('":method | :url | HTTP/:http-version"'));
app.use(morgan(':status | :res[content-length] | :response-time ms'));
app.use(morgan('........................................'));
app.use(morgan(' '));
// end of logger info //

// Serve bundlejs and static files
app.use(express.static("./client/dist"));
app.use(express.static("./client/public"))

// Apply routes that wont serve react app

app.use("/auth", auth);
app.use("/api", passport.authenticate('jwt', { session: false }), api);

// Status... because we care about you
app.get('/status', (req, res) => {
  res.send({ status: "ok", code: 201 });
})

// Serve React app on all routes except the ones above route
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./client/public/index.html'));
})

module.exports = app;
