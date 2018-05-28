const server = require('./server/app.js');
const { PORT, ADDRESS, MONGO_CONN } = require('./config');

// connect to the database and load models
// require('./models').connect(MONGO_CONN);

server.listen(PORT, () => {
  console.log(`Web server starting...`);
  console.log(`App listening at ${ADDRESS}:${PORT}`);
  console.log('...\n');
});
