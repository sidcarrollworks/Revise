const server = require('./server/app.js');
const { PORT, ADDRESS, MONGO_CONN } = require('./config');

// Mongoose connection
const mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

const User = require('./server/models/User.js');

mongoose.connect(MONGO_CONN, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.log("Err, not connected to DB");
    console.log(err);
  });
  
// User.findById("507f1f77bcf86cd799439011").exec().then(user => {
//   console.log(1, user);
// })
// .catch(err => {
//   console.log(2, err);
// })


server.listen(PORT, () => {
  console.log(`Web server starting...`);
  console.log(`App listening at ${ADDRESS}:${PORT}`);
  console.log('...\n');
});
