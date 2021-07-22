const { client } = require('./client');

async function getOrderProductsById(id) {
    try {
        const { rows: [order_products] } = await client.query(`
        SELECT FROM * order_products 
        WHERE id = $1 
        `,[id])

        return order_products;
    } catch (error) {
        throw error;
    }
}

async function addOrderProducts(orderProducts) {
    const { orderId, productId, price, quantity } = orderProducts;

    try {
        const { rows: [orderProducts]} = await client.query(`
        INSERT INTO order_products("orderId", "productId", price, quantity)
        VALUES($1, $2, $3, $4)
        RETURNING *
        `, [orderId, productId, price, quantity])

        return orderProducts;
    } catch (error) {
        throw error;
    }
}

async function updateOrderProduct({id, price, quantity}) {
    try {
        const { rows: orderProducts} = await client.query(`
        UPDATE order_products
        SET price =$2, quantity=$3
        WHERE id=$1
        RETURNING *
        `, [id, price, quantity])

        return orderProducts
    } catch (error) {
        throw error
    }

}

async function destoryOrderProduct(id) {
    try {
        const { rows: [orderProducts]} = await client.query(`
        DELETE from order_products
        WHERE id=$1
        RETURNING *
        `, [id])

        return orderProducts
    } catch (error) {
        throw error;
    }
}


module.exports = {
    client,
    getOrderProductsById,
    addOrderProducts,
    updateOrderProduct,
    destoryOrderProduct
}