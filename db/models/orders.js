const client = require('../client');

const createOrders = async ({orderId, userId, location, price, itemId, itemQuantity, item}) => {
    try {
        const {rows: [order]} = await client.query(`
            INSERT INTO orders(orderId, userId, location, price, itemId, itemQuantity, time) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (userId, location, price, item) DO NOTHING 
        
        `, [orderId, userId, location, price, itemId, itemQuantity, time]);
    } catch (error) {
        throw error;
    }
}

module.export = createOrders