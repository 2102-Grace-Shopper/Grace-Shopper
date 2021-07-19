const { client } = require('./client');
//waiting on users to add usersId for createOrders Function
//still need to create for orders added by usersId,
//still need to create a function for carts and it components (update, create, and cancel orders)
async function createOrders(order) {
    const {status,  datePlaced } = order;
    try {
        const { rows: [order] } = await client.query(`
        INSERT INTO orders(status, "datePlaced" )
        VALUES($1, $2)
        RETURNING *
        `, [status,  datePlaced])

        return order;
    } catch (error) {
        throw error;
    }
}

async function getOrders() {
    try {
        const { rows } = await client.query(`
        SELECT * FROM orders
        `)
        return rows;
    } catch (error) {
        throw error
    }
}

async function getOrdersByProducts({id}) {
    try {
        const { rows: orders } = await client.query(`
        SELECT orders.*, order_products."productId"
        FROM order_products
        JOIN orders ON orders.id=order_products."orderId"
        WHERE "productId"=${id}
         `);
         return orders;
    } catch (error) {
        throw error;
    }
}




module.exports = {
    createOrders,
    getOrders, 
    getOrdersByProducts
}