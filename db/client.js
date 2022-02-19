// Connect to DB
require("dotenv").config();
const { Client } = require("pg");

const { DB_PORT = 5432 } = process.env;

// change the DB_NAME string to whatever your group decides on
const DB_NAME = "rightClicked-dev";

const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:${DB_PORT}/${DB_NAME}`;

const client = new Client({
  connectionString: DB_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = client;
