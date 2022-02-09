const client = require('../client');
const { getProductById } = require('./products');
const { getUserById } = require('./user');

const createOrder = async ({ status, userId, datePlaced }) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
    INSERT INTO orders(status, "userId", "datePlaced")
    VALUES ($1, $2, $3)
    RETURNING *
    `,
      [status, userId, datePlaced]
    );
    return order;
  } catch (error) {
    throw error;
  }
};

async function getAllOrders() {
  try {
    const { rows } = await client.query(
      `
      SELECT * 
      FROM orders;
      `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getOrderById(orderId) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      SELECT *
      FROM order
      WHERE id = $1
      `,
      [orderId]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

// vvvvvv unsure about this guy vvvvvvv
async function getOrdersByUser({ id }) {
  try {
    const user = await getUserById(id);
    const { rows: orders } = await client.query(
      `
    SELECT orders.*, users.username AS "customerName"
    FROM orders
    JOIN users ON orders."userId" = users.id
    WHERE "userId" = $1
    `,
      [user.id]
    );
    return orders;
  } catch (error) {
    throw error;
  }
}
// vvvv unsure about this guy too vvvvv
async function getOrdersByProduct({ id }) {
  try {
    const product = await getProductById(id);
    const { rows: orders } = await client.query(
      `
      SELECT orders.*, users.username AS "customerName"
      FROM orders
      JOIN users ON orders."userId" = users.id
      JOIN order_products ON order_products."productId" = orders.id
      WHERE orders.status = 'created'
      AND order_products."productId" = $1;
      `,
      [product.id]
    );
    return orders;
  } catch (error) {
    throw error;
  }
}

async function getCartByUser({ id }) {
  try {
    const user = await getOrdersByUser(id);
    const { rows: orders } = await client.query(
      `
      SELECT orders.*, users.username AS "customerName"
      FROM orders
      JOIN users ON orders."userId" = users.id
      JOIN order_products ON order_products."productId" = orders.id
      WHERE orders.status = 'created'
      AND order_products."productId" = $1;
      `,
      [user.id]
    );
    return orders;
  } catch (error) {
    throw error;
  }
}
module.exports = { createOrder, getAllOrders, getOrdersByUser, getCartByUser, getOrdersByProduct };
