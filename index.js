// env vars
const { PORT, ADDRESS, MONGO_CONN } = require('./config');

// Mongoose imports
const mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

// Mongoose connection
mongoose.connect(MONGO_CONN, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.log("Err, not connected to DB");
    console.log(err);
  });

// importing models before server INIT
require('./server/models/User.js');
require('./server/models/Project.js');
require('./server/models/File.js');

// Importing and INITING the server
const server = require('./server/app.js');

// Listening on port...
server.listen(PORT, () => {
  console.log(`Web server starting...`);
  console.log(`App listening at ${ADDRESS}:${PORT}`);
  console.log('...\n');
});
