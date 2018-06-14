const { NODE_ENV, REDIS_PORT, REDIS_HOST, REDIS_PASS, PRIVKEY, FULLCHAIN, DHPARAMS } = require('../config');
// importing modules
const bodyParser = require('body-parser');
const passport   = require('passport');
const express    = require('express');
const morgan     = require("morgan");
const helmet     = require('helmet');
const chalk      = require('chalk');
const redis      = require('redis');
const path       = require('path');
const fs         = require('fs');

// init app
const app = express();

//import SSL key
let options = null;
if (NODE_ENV == "production")
  options = {
    key: fs.readFileSync(PRIVKEY),
    cert: fs.readFileSync(FULLCHAIN),
    dhparam: fs.readFileSync(DHPARAMS)
  }

//seting up server
let httpsServer = null;
if (NODE_ENV == "production")
  httpsServer = require('https').createServer(options, app);
const httpServer = require('http').createServer(app);

// init socket IO
const io = require('socket.io')(NODE_ENV == "production" ? httpsServer : httpServer);
if (NODE_ENV == "production")
  io.adapter(require('socket.io-redis')({ 
    pubClient: redis.createClient(REDIS_PORT, REDIS_HOST, { auth_pass: REDIS_PASS }),
    subClient: redis.createClient(REDIS_PORT, REDIS_HOST, { auth_pass: REDIS_PASS })
  }));
// reddis IO connection


// passing IO to response middleware
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Main sockerIO logic
io.use(require('./utils/socketIO/auth.js'))
.on('connection', require('./utils/socketIO/connEvents.js'));

  
  
// Helmet for security and redirect to HTTPS
app.use(helmet())
if (NODE_ENV == "production")
  app.use(require('./utils/middleware/httpsRedirect.js'));

// body parser
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: false }));

// Initialize passport
app.use(passport.initialize());
// import passport strategies
const SignupStrategy = require('./utils/passport/signup-strategy.js');
const LoginStrategy = require('./utils/passport/login-strategy.js');
const jwtStrategy = require('./utils/passport/jwt-strategy.js')
// load passport strategies
passport.use('signup', SignupStrategy);
passport.use('login', LoginStrategy);
passport.use('jwt', jwtStrategy);

// app.use(morgana)
// Morgan logger //
app.use(morgan(chalk.grey('........................................')));
app.use(morgan(chalk.blue(':user-agent')));
app.use(morgan(chalk.red.bold('[:date[clf]]')));
app.use(morgan(chalk.yellow.bold('":method | :url | HTTP/:http-version"')));
app.use(morgan(chalk.cyan(':status | :res[content-length] | :response-time ms')));
app.use(morgan(chalk.grey('........................................')));
app.use(morgan(' '));
// end of logger info //

// importing routes
const api = require("./routes/api");
const auth = require("./routes/auth.js");
// Serve bundlejs and static files
app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(express.static(path.resolve(__dirname, '../client/public')));

// Apply routes that wont serve react app
app.use("/auth", auth);
app.use("/api", passport.authenticate('jwt', { session: false }), api);

// Status... because we care about you
app.get('/status', (req, res) => {
  res.send({ status: "ok", code: 201 });
})

// Serve React app on all routes except the ones above route
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'));
})

module.exports = {app: app, httpServer: httpServer, httpsServer: httpsServer}
