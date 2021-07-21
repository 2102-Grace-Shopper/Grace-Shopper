const { client } = require('./client');
const { createDogs } = require('./dogs')

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

async function populateInitialData() {
  try {
    console.log("Creating Dogs...");
    const seedDataDogs = [
      { 
        id: 1,
        name: "JoJo",
        description: "A beautiful hairy dog",
        price: 100,
        age: 2,
      },
      { 
        id: 2,
        name: "Sunny",
        description: "Fast and playful",
        price: 50,
        age: 5,
      },
    ];

    const launchSeedDataDogs = await Promise.all(seedDataDogs.map((dog) => createDogs(dog)));
    console.log("Here are your seeded dogs:", launchSeedDataDogs);
    
  } catch (error) {
    throw error;
  }
}

async function populateInitialBreedData(){
  try{
    console.log("Creating Breeds...");
    const seedDataBreeds = [
      {
        id: 1,
        name: "Shiba Inu"
      },
      {
        id: 2,
        name: "Doberman Pinscher"
      },
      {
        id: 3,
        name: "Great Dane"
      },
      {
        id: 4,
        name: "Siberian Husky"
      },
      {
        id: 5,
        name: "Boxer"
      },
      {
        id: 6,
        name: "Rottweiler"
      },
      {
        id: 7,
        name: "Poodle"
      },
      {
        id: 8,
        name: "French Bulldog"
      },
      {
        id: 9,
        name: "Beagle"
      },
      {
        id: 10,
        name: "Pitbull"
      },
      {
        id: 11,
        name: "Golden Retriever"
      },
      {
        id: 12,
        name: "German Shepherd"
      },
      {
        id: 13,
        name: "Shih Tzu"
      },
      {
        id: 14,
        name: "Dachshund"
      },
      {
        id: 15,
        name: "Pug"
      },
    ]
    const launchSeedDataBreeds = await Promise.all(seedDataBreeds.map((breed) => createBreeds(breed)));
    console.log("Here are your seeded breeds:", launchSeedDataBreeds)
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .then(populateInitialBreedData)
  .catch(console.error)
  .finally(() => client.end());