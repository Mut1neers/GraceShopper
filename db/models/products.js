const client = require('../client');

async function createProduct({ name, description }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        INSERT INTO products(name, description) VALUES ($1, $2)
        ON CONFLICT (name) DO NOTHING 
        RETURNING *
      `,
      [name, description]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProduct,
};
