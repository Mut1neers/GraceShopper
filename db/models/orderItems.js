const client = require('../client');

const order_products = async () => {
    try {
        const {rows: [order_product]} = await client.query(`
            CREATE TABLE order_product(
                id SERIAL PRIMARY KEY,
                productId REFRENCES products(id),
                orderId REFRENCES orders(id),
                price NOT NULL,
                quanitity NOT NULL DEFAULT VALUE 0
            )
        `, []);
    } catch (error) {
        throw error;
    }
}

module.export = createOrders