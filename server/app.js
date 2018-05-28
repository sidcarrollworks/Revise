const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan')
const path = require('path');

// importing routes


// init app
const app = express();



// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());


// Morgan logger //
app.use(morgan("........................................"));
app.use(morgan(':user-agent'));
app.use(morgan('[:date[clf]]'));
app.use(morgan('":method | :url | HTTP/:http-version"'));
app.use(morgan(':status | :res[content-length] | :response-time ms'));
app.use(morgan('........................................'));
app.use(morgan(' '));
// end of logger info //

// Serve react app and public
app.use(express.static("./client/dist"));
app.use(express.static("./client/public"))

// Apply routes

app.get("/test", (req, res) => {
  res.send({ hello: "bitch" });
})

// React route
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./client/public/index.html'));
})

module.exports = app;
