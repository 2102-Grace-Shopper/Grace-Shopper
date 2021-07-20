const { client } = require('./client');
//waiting on users to add usersId for createOrders Function
//still need to create for orders added by usersId,
//still need to create cart and it components when updating, completion, and cancelation

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

async function getOrderById(id) {
    try {
        const { rows: [order] } = await client.query(`
        SELECT * FROM orders
        WHERE id = $1,
        `, [id])

        return order;
    } catch (error) {
        throw error;
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
//Under Construction carts//waiting for usersId
async function getCartsByUserId() {

  try {
      
  } catch (error) {
      throw error;
  }
}

//Under Construction waiting for users
async function getOrdersByUser() {

}

//Under Construction allows for orders/carts to be update
async function updateOrder() {

}

//Under Constructions sets the orders status to completed when purchase/send to the cart
async function completedOrder() {

}

//Under Construction sets the order status to cancel when item is out of stock/or user decides to cancel the order
async function cancelOrder() {

}




module.exports = {
    client,
    createOrders,
    getOrders, 
    getOrdersByProducts,
    getOrderById
}