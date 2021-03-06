const {client} = require('./client')

async function createProduct(product) {
    const {name, description, price, inStock, imageURL, category } = product;
     try {
         const { rows: [product] } = await client.query(`
         INSERT INTO products(name, description, price, "inStock", "imageURL", category)
         VALUES($1, $2, $3, $4, $5, $6)
         RETURNING *
         `, [name, description, price, inStock, imageURL, category])

         return product;
     } catch (error) {
         throw error
     }
}

async function getProduct() {
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM products
        `)

        return rows
    } catch (error) {
        throw error;
    }
}

async function getProductByCategory(category) {
    try {
        const{ rows } = await client.query(`
        SELECT * 
        FROM products
        WHERE category = $1 
        `, [category] )

        return rows;
    } catch (error) {
        throw error;
    }
}

//Under Construction... still waiting for reviews to add onto...
async function getProductById(id) {
    try {
        const { rows: [product] } = await client.query(`
        SELECT *
        FROM products
        WHERE id=$1
        `, [id])

        return product
    } catch (error) {
        
    }
}

async function updateProduct({id, ...fields}) {
    const setString = Object.keys(fields).map(
        (key, index) => `"$${ index + 1 }`
    ).join(', ');

    const objVal = Object.values(fields)
    if ( setString.length === 0) {
        return;
    }
    objVal.push(id)

    try {
        const {rows: [product]} = await client.query(`
        UPDATE products
        SET ${setString}
        WHERE id = $${objVal.length}
        RETURNING *
        `, objVal)

        return product
    } catch (error) {
        throw error
    }
}

async function destroyProduct({id}) {
    try {
        await client.query(`
        DELETE FROM order_products
        WHERE "productId" = $1
        RETURNING *
        `, [id])
        const {rows: [product] } = await client.query(`
        DELETE FROM products
        WHERE id = $1
        RETURNING *
        `, [id])
        return product
    } catch (error) {
        throw error
    }
}

module.exports = {
    client, 
    createProduct, 
    getProduct,
    getProductByCategory,
    getProductById,
    updateProduct,
    destroyProduct
}