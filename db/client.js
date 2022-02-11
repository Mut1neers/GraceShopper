// Connect to DB
require("dotenv").config();
const { Client } = require("pg");

const { DB_PORT } = process.env || 5432;

// change the DB_NAME string to whatever your group decides on
const DB_NAME = "rightClicked-dev";

const DB_URL =
  process.env.HEROKU_POSTGRESQL_CRIMSON_URL ||
  `postgres://localhost:${DB_PORT}/${DB_NAME}`;

const client = new Client(DB_URL);

module.exports = client;
