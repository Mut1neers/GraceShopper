const client = require('../client');
const util = require('../util');

async function getOrderProductById(id) {
  try {
    const { rows: orderProduct } = await client.query(
      `
        SELECT * FROM order_products
        WHERE id = $1
        `,
      [id]
    );
    return orderProduct;
  } catch (error) {
    throw error;
  }
}

async function addProductToOrder({ orderId, productId, price, quantity }) {
  try {
    const {
      rows: [orderProduct],
    } = await client.query(
      `
        INSERT INTO order_products ( "orderId", "productId", price, quantity)
        VALUES($1, $2, $3, $4)
        ON CONFLICT ("orderId", "productId") DO NOTHING
        RETURNING *
        `,
      [orderId, productId, price, quantity]
    );
    return orderProduct;
  } catch (error) {
    throw error;
  }
}

async function updateOrderProduct({ id, ...fields }) {
  try {
    const toUpdate = {};
    for (let column in fields) {
      if (fields[column] !== undefined) toUpdate[column] = fields[column];
    }
    let order;
    if (util.dbFields(fields).insert.length > 0) {
      const { rows } = await client.query(
        `
                UPDATE order_products
                SET ${util.dbFields(toUpdate).insert}
                WHERE id=${id}
                RETURNING *;
                `,
        Object.values(toUpdate)
      );
      orderProduct = rows[0];
      return orderProduct;
    }
  } catch (error) {
    throw error;
  }
}

async function destroyOrderProduct(id) {
  try {
    const {
      rows: [orderProduct],
    } = await client.query(
      `
      DELETE FROM order_products
      WHERE id = $1
      RETURNING *;
      `,
      [id]
    );
    return orderProduct;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  getOrderProductById,
  addProductToOrder,
  updateOrderProduct,
  destroyOrderProduct,
};
