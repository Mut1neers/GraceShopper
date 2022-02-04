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

module.exports = {
  createProduct,
};
