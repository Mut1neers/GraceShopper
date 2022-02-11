// Connect to DB
require('dotenv').config();
const { Client } = require('pg');

const { DB_PORT } = process.env || 5432;

// change the DB_NAME string to whatever your group decides on
const DB_NAME = 'rightClicked-dev';

// const DB_URL =
//   process.env.HEROKU_POSTGRESQL_CRIMSON_URL ||
//   `postgres://localhost:${DB_PORT}/${DB_NAME}`;

const client = new Client({
  connectionString:
    'postgres://faevujzbxrknvj:e3befa882a3f0d2ef602a8160a7ad5dbcc414ad3bf146cb2acaa8f19e3c4791f@ec2-3-212-143-188.compute-1.amazonaws.com:5432/d7rqghoakrd3c8',
  ssl: true,
});

module.exports = client;
