const {
  // declare your model imports here
  // for example, User
  createUser,
} = require('./models/user');
const client = require('./client');

async function dropTables() {
  console.log('Dropping All Tables...');
  // drop all tables, in the correct order
  try {
    await client.query(`
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;
`);
    console.log('Finished dropping tables!');
  } catch (error) {
    console.error('Error dropping tables!');
    throw error;
  }
}

async function buildTables() {
  // build tables in correct order
  console.log('Starting to build tables...');
  try {
    await client.query(`
    CREATE TABLE users(
      id  SERIAL PRIMARY KEY, 
      username VARCHAR(255) UNIQUE NOT NULL, 
      password VARCHAR(255) NOT NULL
    );
  `);
    await client.query(`
    CREATE TABLE products(
      id SERIAL PRIMARY KEY, 
      name VARCHAR(255) UNIQUE NOT NULL,
      description TEXT NOT NULL
    );
  `);
    console.log('Finished building tables!');
  } catch (error) {
    console.error('Error building tables!');
  }
}

async function populateInitialData() {
  console.log('Starting to populate data...');
  // create useful starting data by leveraging your
  // Model.method() adapters to seed your db, for example:
  // const user1 = await User.createUser({ ...user info goes here... })
  try {
    const usersToCreate = [
      { username: 'albert', password: 'bertie99' },
      { username: 'sandra', password: 'sandra123' },
      { username: 'glamgal', password: 'glamgal123' },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');

    console.log('Starting to create products...');
    const productsToCreate = [
      { name: 'sweet monke', description: 'a very expensive .jpeg of a very sweet monke' },
      { name: 'ugly dog', description: 'this pays homage to one of my favorite bars' },
      { name: 'cool cat', description: "y'all like jazz?" },
    ];
    const products = await Promise.all(productsToCreate.map(createProduct));
    console.log('Products created:');
    console.log(products);
  } catch (error) {
    console.error('Error populating initial data!');
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await buildTables();
    await populateInitialData();
  } catch (error) {
    console.log('Error during rebuildDB');
    throw error;
  }
}
// buildTables()
//   .then(populateInitialData)
//   .catch(console.error)
//   .finally(() => client.end());

module.exports = {
  rebuildDB,
};
