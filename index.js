// env vars
const { PORT, ADDRESS, MONGO_CONN, NODE_ENV } = require('./config');

// I like pretty things
const chalk = require('chalk');

// Mongoose imports
const mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

// Mongoose connection
mongoose.connect(MONGO_CONN)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.log("Err, not connected to DB");
    throw err;
  });

// importing models before server INIT
require('./server/models/User.js');
require('./server/models/Project.js');

// Importing and INITING the server
const httpServer = require('./server/app.js').httpServer;
const httpsServer = require('./server/app.js').httpsServer;
const app = require('./server/app.js').app;

// setting port in app
// app.set('port', PORT);

// Listening on port...
if (NODE_ENV === "production") {
  app.set('port', 4430);

  httpServer.listen(8080);
  httpServer.on('listening', () => {
    console.log(chalk.grey.bold('\n...'));
    console.log(chalk.blue(`Starting redirect service..`));
    console.log(chalk.grey.bold('...\n'));
  })
  httpServer.on('error', err => {
    console.log(chalk.red.bold(err));
  });

  httpsServer.listen(4430);
  httpsServer.on('listening', () => {
    console.log(chalk.grey.bold('\n...'));
    console.log(chalk.blue(`Starting Revise.work...`));
    console.log(chalk.magenta.bold(`App listening at ${ADDRESS}`));
    console.log(chalk.grey.bold('...\n'));
  })
  httpsServer.on('error', err => {
    console.log(chalk.red.bold(err));
  });
} else {
  httpServer.listen(PORT);
  httpServer.on('listening', () => {
    console.log(chalk.grey.bold('\n...'));
    console.log(chalk.blue(`Web server starting...`));
    console.log(chalk.magenta.bold(`App listening at ${ADDRESS}:${PORT}`));
    console.log(chalk.grey.bold('...\n'));
  })
  httpServer.on('error', err => {
    console.log(chalk.red.bold(err));
  });
}
