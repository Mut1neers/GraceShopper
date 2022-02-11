// Connect to DB
require('dotenv').config();
const { Client } = require('pg');

// const { DB_PORT } = process.env || 5432;

// change the DB_NAME string to whatever your group decides on
const DB_NAME = 'rightClicked-dev';

const client = new Client({
  connectionString:
    process.env.DATABASE_URL || 'postgres://localhost:5432/rightClicked-dev',
  ssl: true,
});

module.exports = client;
