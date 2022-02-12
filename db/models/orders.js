const client = require('../client');
const { getProductsByOrderId } = require('./products');
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

async function getOrdersByUser({ id }) {
  // console.log('orderbyUSER:', id);
  try {
    const orders = await getAllOrders();
    const filteredOrders = orders.filter((order) => order.userId === id);
    // console.log('FILTERED ORDERS: ', filteredOrders);
    return filteredOrders;
  } catch (error) {
    throw error;
  }
}

// works vvvv
// async function getOrdersByUser({ id }) {
//   try {
//     const user = await getUserById(id);
//     const { rows: orders } = await client.query(
//       `
//     SELECT orders.*, users.username AS "customerName"
//     FROM orders
//     JOIN users ON orders."userId" = users.id
//     WHERE "userId" = $1
//     `,
//       [id]
//     );
//     return orders;
//   } catch (error) {
//     throw error;
//   }
// }

async function getOrdersByProduct({ id }) {
  try {
    const { rows: orders } = await client.query(
      `
      SELECT orders.*, users.username AS "customerName"
      FROM orders
      JOIN users ON orders."userId" = users.id
      JOIN order_products ON order_products."orderId" = orders.id
      AND order_products."productId" = $1;
      `,
      [id]
    );
    for (let order of orders) {
      order.products = await getProductsByOrderId(order.id);
    }
    console.log('GET ORDERS BY PRODUCT: ', orders);
    return orders;
  } catch (error) {
    throw error;
  }
}

async function getCartByUser(id) {
  // console.log('ID: ', id);
  try {
    const orders = await getAllOrders();
    const filteredOrders = orders.filter((order) => order.userId === id && order.status === 'created');
    for (let order of filteredOrders) {
      order.products = await getProductsByOrderId(order.id);
    }
    console.log('GET CART BY USER: ', filteredOrders);
    return filteredOrders;
  } catch (error) {
    throw error;
  }
}

// async function getCartByUser({ id }) {
//   try {
//     // const user = await getOrdersByUser(id);
//     const { rows: orders } = await client.query(
//       `
//       SELECT orders.*, users.username AS "customerName"
//       FROM orders
//       JOIN users ON orders."userId" = users.id
//       WHERE "userId" = $1
//       AND status = 'created';
//       `,
//       [id]
//     );
//     for (let order of orders) {
//       order.products = await getProductsByOrderId(order.id);
//     }
//     console.log('CART BY USER: ', orders);
//     return orders;
//   } catch (error) {
//     throw error;
//   }
// }

async function updateOrder({ id, ...fields }) {
  try {
    const toUpdate = {};
    for (let column in fields) {
      if (fields[column] !== undefined) toUpdate[column] = fields[column];
    }
    let order;
    if (util.dbFields(fields).insert.length > 0) {
      const { rows } = await client.query(
        `
          UPDATE orders 
          SET ${util.dbFields(toUpdate).insert}
          WHERE id=${id}
          RETURNING *;
      `,
        Object.values(toUpdate)
      );
      order = rows[0];
      return order;
    }
  } catch (error) {
    throw error;
  }
}

async function destroyOrder(id) {
  try {
    await client.query(
      `
    DELETE FROM order_products
    WHERE "orderId" = $1;
    `,
      [id]
    );
    const {
      rows: [order],
    } = await client.query(
      `
    DELETE FROM orders
    WHERE id = $1
    RETURNING *
    `,
      [id]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

async function completeOrder({ id }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      UPDATE orders
      SET status = 'completed'
      WHERE id = $1
      RETURNING *;
      `,
      [id]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

async function cancelOrder(id) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      UPDATE orders
      SET status = 'cancelled'
      WHERE id = $1
      RETURNING *;
      `,
      [id]
    );
    return order;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  getCartByUser,
  getOrdersByProduct,
  getOrderById,
  updateOrder,
  destroyOrder,
  cancelOrder,
  completeOrder,
};
