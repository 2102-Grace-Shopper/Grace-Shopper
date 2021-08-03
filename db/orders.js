const { client } = require('./client');

async function createOrders({status, datePlaced}) {
    try {
        const { rows: [ order ] } = await client.query(`
            INSERT INTO orders
            (status, "datePlaced")
            VALUES($1, $2)
            RETURNING *
        `, [status, datePlaced]);

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
async function getCartsByUserId(id) {
    try {
        const { rows:  [cart]  } = await
        client.query(`
        SELECT * FROM orders
        WHERE status = 'created'
        AND "userId" = $1
        `, [ id ])

        console.log("cartid", cart)

        const { rows: products} = await client.query(`
        SELECT products.*, order_products.id AS "orderProductId"
        FROM products
        JOIN order_products ON products.id=order_products."productId"
        WHERE order_products."orderId"=$1;
        `, [id])

        cart.products = products
        console.log("cart products", cart)
        return cart
    } catch (error) {
        throw error;
    }
}

//Under Construction waiting for users
async function getOrdersByUser(id) {
    try {
        const { rows: order }  = await client.query(`
        SELECT orders.*, users.id AS "userId"
        FROM orders
        JOIN users ON users.id = orders."userId"
        WHERE users.id = $1;
        `, [id]);

        return order;
    } catch (error) {
        throw error;
    }
}

async function updateOrder({id, ...fields}) {
    const setString = Object.keys(fields).map((key, index) => `"${ key }"=$${ index + 1}`
    ).join(', ');

    const objVals = Object.values(fields)

    if(setString.length === 0) {
        return;
    } 
    objVals.push(id)

    try {
        if(setString.length > 0) {
            const { rows: [order] } = await client.query(`
            UPDATE orders
            SET ${setString}
            WHERE id=$${objVals.length}
            RETURNING *;
            `, objVals);

            return order
        }
    } catch (error) {
        throw error;
    }

}

async function completedOrder() {
    try {
        const {rows: [order] } = await client.query(`
        UPDATE orders
        SET status='completed'
        WHERE id=$1
        RETURNING *
        `, [id])

        return order
    } catch (error) {
        throw error;
    }

}

async function cancelOrder() {
    try {
        const { rows: [order] } = await client.query(`
        UPDATE orders
        SET status='cancelled'
        WHERE id=$1
        RETURNING *
        `, [id])
        return order;
    } catch (error) {
        throw error;
    }

}




module.exports = {
    client,
    createOrders,
    getOrders, 
    getOrdersByProducts,
    getCartsByUserId,
    getOrdersByUser,
    getOrderById,
    updateOrder,
    completedOrder,
    cancelOrder
}