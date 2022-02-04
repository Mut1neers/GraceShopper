const client = require('./client');
const { rebuildDB, testDB } = require('./init_db');

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
