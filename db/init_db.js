// code to build and initialize DB goes here
const {
  client, 
} = require('./client');

const {
  createProduct, 
  getProduct
} = require('./products')

async function buildTables() {
  try {
    client.connect();
      // drop tables in correct order
    console.log("Starting to Drop Tables")

    await client.query(`
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS order_products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS dog_breed;
    DROP TABLE IF EXISTS breed;
    DROP TABLE IF EXISTS dogs;
    `);

    console.log('Dropped All Tables')
       // build tables in correct order
    console.log("Starting to Build Tables")

     await client.query(`
     CREATE TABLE dogs(
       id SERIAL PRIMARY KEY,
       name VARCHAR UNIQUE,
       description VARCHAR(255) NOT NULL,
       price VARCHAR(255) NOT NULL,
       age INTEGER  
     );
     CREATE TABLE breed(
       id SERIAL PRIMARY KEY,
       breed VARCHAR(255)
     );
     CREATE TABLE dog_breed(
       id SERIAL PRIMARY KEY,
       "dogId" INTEGER REFERENCES dogs(id),
       "breedId" INTEGER REFERENCES breed(id),
       UNIQUE("dogId", "breedId")
     );
     CREATE TABLE products(
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       description VARCHAR(255) NOT NULL,
       price VARCHAR(255) NOT NULL,
       imageURL VARCHAR(255) DEFAULT 'https://icon-library.com/images/no-image-available-icon/no-image-available-icon-8.jpg',
       inStock BOOLEAN DEFAULT false,
       category VARCHAR(255) NOT NULL
     );
     CREATE TABLE users(
       id SERIAL PRIMARY KEY,
       firstName VARCHAR(255) NOT NULL,
       lastName VARCHAR(255) NOT NULL,
       email VARCHAR(255) UNIQUE NOT NULL,
       username VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) UNIQUE NOT NULL,
       isAdmin BOOLEAN DEFAULT false
     );
     
     CREATE TABLE orders(
       id SERIAL PRIMARY KEY,
       status VARCHAR(255) DEFAULT 'created',
       "userId" INTEGER REFERENCES users(id),
       "datePlaced" DATE NOT NULL DEFAULT CURRENT_DATE
     );
     CREATE TABLE order_products(
       id SERIAL PRIMARY KEY,
       "productId" INTEGER REFERENCES products(id),
       "orderId" INTEGER REFERENCES orders(id),
       price INTEGER NOT NULL,
       quantity INTEGER NOT NULL DEFAULT (0)
     );
     
     CREATE TABLE reviews(
       id SERIAL PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       content VARCHAR(255) DEFAULT NULL,
       "userId" INTEGER REFERENCES users(id),
       "productId" INTEGER REFERENCES products(id)
     );
     `);
     console.log('Finishing Building Tables')

  } catch (error) {
    throw error;
  }
}

// default dummy data for products
async function populateInitialData() {
  console.log('Starting to Create Products')
  try {
    const seedProducts = [
      {
      name: 'Dog Collar', 
      description: 'A Boujee Dog Collar for a Boujee Dog', 
      price: 28.00, 
      imageURL: 'https://www.alamy.com/black-leather-dog-collar-image67953022.html',
      inStock: true,
      category: 'collar'
      }
    ]
    const launchProducts = await Promise.all(seedProducts.map((product) => createProduct(product)))
    console.log('Products Created')
    console.log(launchProducts) 
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());