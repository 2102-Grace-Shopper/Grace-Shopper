// code to build and initialize DB goes here
const { client } = require('./client');

const { createOrders, getOrders } = require('./orders');

const {createProduct,  getProduct } = require('./products')

const { addOrderProducts } = require('./order_products')

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
      name: 'Leather Dog Collar', 
      description: 'A Boujee Dog Collar for a Boujee Dog', 
      price: 28.00, 
      imageURL: 'https://www.alamy.com/black-leather-dog-collar-image67953022.html',
      inStock: true,
      category: 'collar'
      },
      {
        name: 'Heart Tag Dog Collar',
        description: 'A cute dog tag collar for a your little friends',
        price: 30.00,
        imageURL: 'https://www.shutterstock.com/image-photo/heart-dog-tag-leather-collar-isolated-1370316434',
        inStock: true,
        category: 'collar'
      },
      {
        name: 'Stainless Steel Pet Bowl',
        description: 'Perfect bowl for our little messy friends',
        price: 15.00,
        imageURL: 'https://www.shutterstock.com/image-illustration/dog-cat-dry-food-stainless-steel-1530748583',
        inStock: true,
        category: 'bowl'
      },
      {
        name: 'Plastic Pet Bowl',
        description: 'Great bowl to put in dog treats for our little friends',
        imageURL: 'https://www.shutterstock.com/image-vector/empty-red-pet-dog-food-bowl-199044806',
        price: 12.00,
        inStock: true,
        category: 'bowl'
      },
      {
        name: 'Yellow Soft Bed',
        description: 'A perfect bed for our tiny/medium-sized furry friends',
        imageURL: 'https://www.shutterstock.com/image-photo/yellow-soft-small-dog-cats-bed-1676365222',
        price: 34.00,
        inStock: true,
        category: 'bed'
      },
      {
        name: 'Black-Green Soft Bed',
        description: 'A perfect bed for our medium/big-sized furry friends',
        imageURL: 'https://www.shutterstock.com/image-photo/young-beautiul-golden-retriever-dog-373247692',
        price: 38.00,
        inStock: true,
        category: 'bed'
      },
      {
        name: 'Rubber Fetch Balls',
        description: 'A set of three rubber fetch balls to play catch with your furry friends',
        price: 5.00,
        imageURL: 'https://www.shutterstock.com/image-photo/group-three-small-rubber-fetch-balls-304737770',
        inStock: true,
        category: 'toys'
      },
      {
        name: 'Colorful Cotton Rope',
        description: 'Great toy for dogs to wrestle with their owner or other dogs',
        price: 12.00,
        imageURL: 'https://www.shutterstock.com/image-photo/dog-toy-colorful-cotton-rope-games-1071524459',
        inStock: true,
        category: 'toys'
      },
      {
        name: 'Dog Chew Bone and Sticks',
        description: 'A small set of various treats for our furry friends',
        price: 18.00,
        imageURL: 'https://www.shutterstock.com/image-photo/dog-chew-bone-sticks-isolated-on-653239414',
        inStock: true,
        category: 'food'
      },
      {
        name: 'Assortment of Treats',
        description: 'An assortments of treats that will make your furry friend happy and wanting more',
        price: 25.00,
        imageURL: 'https://www.shutterstock.com/image-photo/dog-treats-isolated-on-white-background-69077959',
        inStock: true,
        category: 'food'
      }
    ]
    const launchProducts = await Promise.all(seedProducts.map((product) => createProduct(product)))
    console.log('Products Created')
    console.log(launchProducts) 
  } catch (error) {
    throw error;
  }
}
//waiting on users to add usersId
async function populateInitialOrders() {
  console.log('Starting to Create Orders')
  try {
    const seedOrders = [
      {
        status: 'created',
        datePlaced: '2021-07-19 18:10:25-07'
      },
      {
        status: 'canceled',
        datePlaced: '2021-06-05 10:10:25-07'
      },
      {
        status:'created',
        datePlaced: '2021-05-22 11:10:25-07'
      }
    ]
    const launchOrders = await Promise.all(seedOrders.map((order) => createOrders(order)))
    console.log('Orders created')
    console.log(launchOrders)
  } catch (error) {
    throw error;
  }
}

async function populateInitialOrderProducts() {
  console.log('Starting to Create Order Products')
  try {
    const [order1, order2, order3] = await getOrders();
    const [ prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9, prod10] = await getProduct();

    const seedOrderProducts = [
      {
        productId: prod1.id,
        orderId: order1.id,
        price: prod1.price,
        quantity: 2
      },
      {
        productId: prod2.id,
        orderId: order1.id,
        price: prod2.price,
        quantity: 1
      },
      {
        productId: prod3.id,
        orderId: order2.id,
        price: prod3.price,
        quantity: 3
      },
      {
        productId: prod4.id,
        orderId: order3.id,
        price: prod4.price,
        quantity: 4
      }
    ]

    const launchOrderProducts = await Promise.all(seedOrderProducts.map((orderProducts) => addOrderProducts(orderProducts)))
    console.log('order_products created: ', launchOrderProducts)
    console.log('Finished Creating Order Products')
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .then(populateInitialOrders)
  .then(populateInitialOrderProducts)
  .catch(console.error)
  .finally(() => client.end());