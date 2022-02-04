// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

// user functions
async function createUser({ firstName, lastName, email, imageURL, username, password, isAdmin }) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(firstName, lastName, email, imageURL, username, password, "isAdmin") 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (username) DO NOTHING 
      RETURNING id, username, firstName, lastName, email, imageURL, "isAdmin"
    `,
      [firstName, lastName, email, imageURL, username, hashedPassword, isAdmin]
    );
    return user;
  } catch (error) {
    console.log('Error creating user');
    console.error(error);
    throw error;
  }
}

async function getUser({ username, password }) {
  if (!username || !password) {
    return;
  }

  try {
    const user = await getUserByUsername(username);
    if (!user) return;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM users;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  // first get the user
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE id = $1;
    `,
      [userId]
    );
    // if it doesn't exist, return null
    if (!user) return null;
    // if it does:
    // delete the 'password' key from the returned object
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}
async function getUserByUsername(userName) {
  // first get the user
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username = $1;
    `,
      [userName]
    );
    // if it doesn't exist, return null
    if (!rows || !rows.length) return null;
    // if it does:
    // delete the 'password' key from the returned object
    const [user] = rows;
    // delete user.password;
    return user;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  // add your database adapter fns here
  createUser,
  getUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
};
