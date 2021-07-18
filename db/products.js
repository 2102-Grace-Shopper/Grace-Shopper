const {client} = require('./client')

async function createProduct(product) {
    const {name, description, price, inStock, imageUrl, category } = product;
     try {
         const { rows: [product] } = await client.query(`
         INSERT INTO products(name, description, price, inStock, imageUrl, category)
         VALUES($1, $2, $3, $4, $5, $6)
         RETURNING *
         `, [name, description, price, inStock, imageUrl, category])

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

module.exports = {
    createProduct, 
    getProduct
}
