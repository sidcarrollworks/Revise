const server = require('./server/app.js');
const { PORT, ADDRESS, MONGO_CONN } = require('./config');

// Mongoose connection
const mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.Promise = global.Promise;


mongoose.
  connect("mongodb://localhost/revise_db", {
	})
  .then(() => {
	  console.log("Connected to MongoDB");
	})
  .catch(err => {
    console.log("Err, not connected to DB");
	  console.log(err);
	});


server.listen(PORT, () => {
  console.log(`Web server starting...`);
  console.log(`App listening at ${ADDRESS}:${PORT}`);
  console.log('...\n');
});
