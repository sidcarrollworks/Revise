// if (process.env.NODE_ENV !== "production")
  require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || null,
  MONGO_CONN: process.env.REVISE_MONGO_CONN || "mongodb://localhost/revise_db",
  PORT: 3000,
  ADDRESS: process.env.REVISE_ADDRESS || "localhost",
  JWT_SECRET: process.env.REVISE_SESH_SECRET || "keyboard_cat",
  REDIS_PORT: process.env.REVISE_REDIS_PORT || null,
  REDIS_HOST: process.env.REVISE_REDIS_HOST || null,
  REDIS_PASS: process.env.REVISE_REDIS_PASS || null,
  FULLCHAIN: process.env.REVISE_FULLCHAIN || null,
  PRIVKEY: process.env.REVISE_PRIVKEY || null,
  DHPARAMS: process.env.REVISE_DHPARAMS || null,
  SENTRY_TEST: process.env.SENTRY_TEST || null,
  SENTRY_DNS: process.env.REVISE_SENTRY_DNS || null
};
