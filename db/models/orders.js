const client = require('../client');

const createOrders = async () => {
    try {
        const {rows: [order]} = await client.query(`
        CREATE TABLE order(
            id SERIAL PRIMARY KEY,
            status DEFAULT VALUE created,
            userId REFRENCES users(id),
            datePlaced DATE
        )
        `, []);

        return order
    } catch (error) {
        throw error;
    }
}

module.export = createOrders