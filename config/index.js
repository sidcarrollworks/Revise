if (!process.env.ENV)
  require('dotenv').config();

module.exports = {
  MONGO_CONN: process.env.MONGO_CONN || "mongodb://localhost/revise_db",
  PORT: process.env.PORT || 3000,
  ADDRESS: process.env.ADDRESS || "localhost",
  JWT_SECRET: process.env.SESH_SECRET || "keyboard_cat"
};
