const client = require('../client');

async function createProduct({ name, description, price, imageURL, inStock, category }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        INSERT INTO products(name, description, price, imageURL, "inStock", category) 
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (name) DO NOTHING 
        RETURNING *
      `,
      [name, description, price, imageURL, inStock, category]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows } = await client.query(
      `
      SELECT * 
      FROM products;
      `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getProductById(productId) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      SELECT *
      FROM products
      WHERE id = $1
      `,
      [productId]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function getProductsByOrderId(id) {
  try {
    const { rows: products } = await client.query(
      `
      SELECT products.*, order_products.quantity, order_products.id AS "orderProductId"
      FROM products
      JOIN order_products ON order_products."productId" = products.id
      WHERE order_products."orderId" = $1;
      `,
      [id]
    );
    return products;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByOrderId,
};
