const {
  // declare your model imports here
  // for example, User
  createUser,
} = require('./models/user');

const {
  createProduct,
  getAllProducts,
  getProductById,
} = require('./models/products');
const { createOrder, getAllOrders } = require('./models/orders');

const client = require('./client');
const { addProductToOrder } = require('./models/order_products');

async function dropTables() {
  console.log('Dropping all tables...');
  // drop all tables, in the correct order
  try {
    await client.query(`
DROP TABLE IF EXISTS order_products;
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
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) UNIQUE NOT NULL,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      imageURL VARCHAR(255),
      "isAdmin" BOOLEAN DEFAULT false NOT NULL
    );

    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      imageURL VARCHAR(255),
      "inStock" BOOLEAN DEFAULT false,
      category VARCHAR(255) NOT NULL
    );

    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      status VARCHAR(255) DEFAULT 'created',
      "userId" INTEGER REFERENCES users(id),
      "datePlaced" DATE
      );

    CREATE TABLE order_products(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id),
      "orderId" INTEGER REFERENCES orders(id),
      price DECIMAL(10, 2) NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 0,
      UNIQUE ("orderId", "productId")
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
      {
        firstName: 'austin',
        lastName: 'coats',
        email: 'austin.b.coats@gmail.com',
        imageURL: '',
        username: 'austy',
        password: 'password',
        isAdmin: 'false',
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');

    console.log('Starting to create products...');
    const productsToCreate = [
      {
        name: 'sweet monke',
        description: 'a very expensive .jpeg of a very sweet monke',
        price: 5000,
        imageURL: '',
        inStock: 'false',
        category: 'monke',
      },
    ];
    const products = await Promise.all(productsToCreate.map(createProduct));
    console.log('Products created:');
    console.log(products);

    const ordersToCreate = [
      {
        status: 'created',
        userId: '1',
        datePlaced: '2-4-2022',
      },
    ];
    const orders = await Promise.all(ordersToCreate.map(createOrder));
    console.log('Orders created:');
    console.log(orders);

    console.log('Starting to create orderProducts...');
    const orderProductsToCreate = [
      {
        productId: 1,
        orderId: 1,
        price: 5000,
        quantity: 1,
      },
    ];
    const orderProducts = await Promise.all(
      orderProductsToCreate.map(addProductToOrder)
    );
    console.log('order_products created: ', orderProducts);
    console.log('Finished creating order_products!');
  } catch (error) {
    console.error('Error populating initial data!');
    throw error;
  }
}

const rebuildDB = async () => {
  try {
    client.connect();
    await dropTables();
    await buildTables();
    await populateInitialData();
  } catch (error) {
    console.log('Error during rebuildDB');
    throw error;
  }
};

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());

module.exports = { rebuildDB };
