const { client } = require('./client');
const { createDogs } = require('./dogs')
const { createBreed } = require('./breed')
const { createDogBreed, getDogBreedById, getAllDogBreeds } = require('./dog_breed')
const { createReviews } = require('./reviews')
const { createOrders, getOrders } = require('./orders');
const {createProduct,  getProduct } = require('./products')
const { addOrderProducts } = require('./order_products')
const { createUser } =require('./users')

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
       age INTEGER,
       "imageURL" VARCHAR(255) DEFAULT 'imageUrl goes here'
     );

     CREATE TABLE breed(
       id SERIAL PRIMARY KEY,
       name VARCHAR(255)
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
      "imageURL" VARCHAR(255) DEFAULT 'imageUrl goes here',
      "inStock" BOOLEAN DEFAULT false,
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

async function populateInitialDogData() {
  try {
    console.log("Creating Dogs...");
    const seedDataDogs = [
      { 
        id: 1,
        name: "Fido",
        description: "a classic great dog",
        price: 125.00,
        age: 2,
        imageURL: "https://i.postimg.cc/kG8bKwrR/815167e9-f69a-4557-84de-e7eba5c2ba53.jpg"
      },
      { 
        id: 2,
        name: "Bella",
        description: "smart and witty",
        price: 125.00,
        age: 2,
        imageURL: "https://i.postimg.cc/GhsYX65M/8536-28743-5665.jpg"
      },
      { 
        id: 3,
        name: "Charlie",
        description: "loves to play fetch",
        price: 125.00,
        age: 2,
        imageURL: "https://i.postimg.cc/BZjMGYzF/1326984c-39b0-492c-a773-f120d747a7e2.jpg"
      },
      { 
        id: 4,
        name: "Lucy",
        description: "fast and playful",
        price: 125.00,
        age: 2,
        imageURL: "https://i.postimg.cc/XNtxNKMz/1ef19cb9-b8a6-47b8-bde2-ac9383ac5af0.jpg"
      },
      { 
        id: 5,
        name: "Duke",
        description: "a beautiful hairy dog",
        price: 125.00,
        age: 2,
        imageURL: "https://dog.ceo/api/breeds/image/random"
      },
      { 
        id: 6,
        name: "Molly",
        description: "loves to hangout in the sunshine",
        price: 125.00,
        age: 2,
        imageURL: "https://dog.ceo/api/breeds/image/random"
      },
      { 
        id: 7,
        name: "JoJo",
        description: "a great cuddler",
        price: 125.00,
        age: 2,
        imageURL: "https://dog.ceo/api/breeds/image/random"
      },
      { 
        id: 8,
        name: "Oliver",
        description: "a very sophisticated animal",
        price: 125.00,
        age: 2,
        imageURL: "https://dog.ceo/api/breeds/image/random"
      },
      { 
        id: 9,
        name: "Penny",
        description: "a bit ferocious but a nice dog",
        price: 125.00,
        age: 2,
        imageURL: "https://dog.ceo/api/breeds/image/random"
      },
      { 
        id: 10,
        name: "Zeus",
        description: "the king of all dogs",
        price: 125.00,
        age: 2,
        imageURL: "https://dog.ceo/api/breeds/image/random"
      },
      { 
        id: 11,
        name: "Scout",
        description: "the best adventure dog in the world",
        price: 125.00,
        age: 2,
        imageURL: "https://dog.ceo/api/breeds/image/random"
      },
      { 
        id: 12,
        name: "Crinkles",
        description: "the most lovable face ever",
        price: 125.00,
        age: 2,
        imageURL: "https://dog.ceo/api/breeds/image/random"
      },
      { 
        id: 13,
        name: "Moose",
        description: "big, cuddly and hairy",
        price: 125.00,
        age: 2,
        imageURL: "https://dog.ceo/api/breeds/image/random"
      },
      { 
        id: 14,
        name: "Dexter",
        description: "too smart for his own good",
        price: 125.00,
        age: 2,
        imageURL: "https://dog.ceo/api/breeds/image/random"
      },
      { 
        id: 15,
        name: "Bandit",
        description: "he'll still your food, but you'll still love him",
        price: 125.00,
        age: 2,
        imageURL: "https://dog.ceo/api/breeds/image/random"
      },
      { 
        id: 16,
        name: "Oakley",
        description: "a pretty amazing dog",
        price: 125.00,
        age: 2,
        imageURL: "https://dog.ceo/api/breeds/image/random"
      },
      { 
        id: 17,
        name: "Ace",
        description: "always comes through when you need him",
        price: 125.00,
        age: 2,
        imageURL: "https://dog.ceo/api/breeds/image/random"
      },
      { 
        id: 18,
        name: "Winnie",
        description: "old and wise",
        price: 125.00,
        age: 2,
        imageURL: "https://dog.ceo/api/breeds/image/random"
      },
      { 
        id: 19,
        name: "Dakota",
        description: "the perfect mountain dog for your backpacking adventures",
        price: 125.00,
        age: 2,
        imageURL: "https://dog.ceo/api/breeds/image/random"
      },
      { 
        id: 20,
        name: "Sunny",
        description: "always smiling, making you laugh",
        price: 125.00,
        age: 2,
        imageURL: "https://dog.ceo/api/breeds/image/random"
      }
    ];

    const launchSeedDataDogs = await Promise.all(seedDataDogs.map((dog) => createDogs(dog)));
    // console.log("Here are your seeded dogs:", launchSeedDataDogs);
       console.log("Dogs are seeded");
    
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
    ];

    const launchSeedDataBreeds = await Promise.all(seedDataBreeds.map((breed) => createBreed(breed)));
    // console.log("Here are your seeded breeds:", launchSeedDataBreeds)
    console.log("Breeds are seeded");
  } catch (error) {
    throw error;
  }
}

async function populateInitialDogBreedData(){
  try{
    console.log("Creating connection between dog and breed...");
    const firstDogBreed = await createDogBreed(1, 1);
    const secondDogBreed = await createDogBreed(3, 2);
    const thirdDogBreed = await createDogBreed(4, 6);

    // console.log("Dog and Breed connection created: ", firstDogBreed);
    // console.log("Dog and Breed connection created: ", secondDogBreed);
    // console.log("Dog and Breed connection created: ", thirdDogBreed);
    console.log("Finished creating dog and breed connection!");

    const testGetAllDogBreeds = await getAllDogBreeds(1);
    // console.log("Test to see if testGetAllDogBreeds works", testGetAllDogBreeds);

    const testDogBreedById = await getDogBreedById(1);
    // console.log("Test to see if testDogById works", testDogBreedById);

  } catch (error) {
    throw error;
  }
}

async function populateInitialUsers() {
  try {
    console.log("Creating users...");
    // create useful starting data
    const seedUsers = [
      {
        id: 1,
        firstName: "Bob",
        lastName: "Smith",
        email: "bobswag@gswag.com",
        username: "bobbyboi",
        password: "swag",
        isAdmin: false
      },
      {
        id: 2,
        firstName: "Admin",
        lastName: "Admin",
        email: "Admin@admin.com",
        username: "Admin",
        password: "Admin",
        isAdmin: true
      },
      {
        id: 3,
        firstName: "Michael",
        lastName: "Scott",
        email: "dundermifflin@gmail.com",
        username: "michaelscott",
        password: "password",
        isAdmin: false
      }
    ]
    const launchUsers = await Promise.all(seedUsers.map((user) => createUser(user)))
    // console.log('Here are the users', launchUsers);
    console.log('Users are seeded');
  } catch (error) {
    throw error;
  }
};

async function populateInitialProductsData() {
  console.log('Starting to Create Products')
  try {
    const seedProducts = [
      {
      name: 'Leather Dog Collar', 
      description: 'A great accessory that will make all the dogs and dogs owners jealous. ', 
      price: 28.00, 
      imageURL: 'https://i.postimg.cc/dQfhmCvn/61l-W8-R-w-O9-L-AC-SY450.jpg',
      inStock: true,
      category: 'collar'
      },
      {
        name: 'Heart Tag Dog Collar',
        description: 'An adorable collar that will make your furry friend 10x cuter. ',
        price: 30.00,
        imageURL: 'https://i.postimg.cc/BbbMWKwM/2953948-back-1.jpg',
        inStock: true,
        category: 'collar'
      },
      {
        name: 'Stainless Steel Pet Bowl',
        description: 'Perfect bowl for our little messy furry friends',
        price: 15.00,
        imageURL: 'https://i.postimg.cc/QMPpBy6k/61m-BXZiwiw-L.jpg',
        inStock: true,
        category: 'bowl'
      },
      {
        name: 'Double Plastic Pet Bowl ',
        description: 'Save more by buying this pet bowl that carries both treats and meals for our furry friends.',
        imageURL: 'https://i.postimg.cc/DygLQZjz/Custom-Printed-Double-Plastic-Pet-Bowl-500x500.jpg',
        price: 12.00,
        inStock: true,
        category: 'bowl'
      },
      {
        name: 'Comfy Yellow Bed',
        description: 'Keep your furry friend comfy while sleeping or relaxing on this comfy yellow bed.',
        imageURL: 'https://i.postimg.cc/yx5q2Bn3/71-GI4-D-l12-L-AC-SX466.jpg',
        price: 34.00,
        inStock: true,
        category: 'bed'
      },
      {
        name: 'Fluffy Donut-Shaped Bed',
        description: 'Our furry friends will forever dream of donuts with this super comfy bed.',
        imageURL: 'https://i.postimg.cc/jjvFGtSq/71-Rka-SEY0z-L-AC-SL1500.jpg',
        price: 38.00,
        inStock: true,
        category: 'bed'
      },
      {
        name: 'Rubber Fetch Balls',
        description: 'A set of three rubber fetch balls to play catch with your furry friend',
        price: 5.00,
        imageURL: 'https://i.postimg.cc/J4NVpwZ0/152846-Main-AC-SL400-V1549655069.jpg',
        inStock: true,
        category: 'toys'
      },
      {
        name: 'Colorful Cotton Rope',
        description: 'Great toy for dogs to wrestle with their owner or other dogs',
        price: 12.00,
        imageURL: 'https://i.postimg.cc/c4mkKdfR/dog-toys-mammoth-rope-2knot.jpg',
        inStock: true,
        category: 'toys'
      },
      {
        name: 'Dog Chew Bone',
        description: 'A set of three dog chew bones that will have your furry friend craving more',
        price: 18.00,
        imageURL: 'https://i.postimg.cc/26GLQ9GK/31-QPEG4v-Ji-L-AC.jpg',
        inStock: true,
        category: 'food'
      },
      {
        name: 'Dog Treats',
        description: 'Delicious dog treats that will have your furry friend mouthwatering',
        price: 25.00,
        imageURL: 'https://i.postimg.cc/JhWs9CdF/Peanut-Butter-Dog-Treats-square-1400.jpg',
        inStock: true,
        category: 'food'
      }
    ]
    const launchProducts = await Promise.all(seedProducts.map((product) => createProduct(product)))
    console.log('Products Created')
    // console.log(launchProducts) 
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
        userId: '1',
        datePlaced: '2021-07-19 18:10:25-07'
      },
      {
        status: 'canceled',
        userId: '2',
        datePlaced: '2021-06-05 10:10:25-07'
      },
      {
        status:'created',
        userId: '3',
        datePlaced: '2021-05-22 11:10:25-07'
      }
    ]
    const launchOrders = await Promise.all(seedOrders.map((order) => createOrders(order)))
    console.log('Orders created')
    // console.log(launchOrders)
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
    // console.log('order_products created: ', launchOrderProducts)
    console.log('Finished Creating Order Products')
  } catch (error) {
    throw error;
  }
}

async function populateInitialReviews(){
  try{
    console.log("Creating Reviews...");
    const seedDataReviews = [
      {
        id: 1,
        title: "Review 1",
        content: "This is a test",
        userId:1,
        productId: 1
      },
    ];

    const launchSeedDataReviews = await Promise.all(seedDataReviews.map((review) => createReviews(review)));
    // console.log("Here are your seeded reviews:", launchSeedDataReviews)
    console.log("Reviws are seeded");

  } catch (error) {
    throw error;
  }
}




buildTables()
  .then(populateInitialDogData)
  .then(populateInitialBreedData)
  .then(populateInitialDogBreedData)
  .then(populateInitialUsers)
  .then(populateInitialProductsData)
  .then(populateInitialOrders)
  .then(populateInitialOrderProducts)
  .then(populateInitialReviews)
  .catch(console.error)
  .finally(() => client.end());