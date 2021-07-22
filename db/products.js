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

module.exports = {
    client, 
    createProduct, 
    getProduct,
    getProductByCategory,
    getProductById
}
