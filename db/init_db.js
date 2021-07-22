const { client } = require('./client');
const { createDogs } = require('./dogs')
const { createBreed } = require('./breed')
const { createDogBreed, getDogBreedById, getAllDogBreeds } = require('./dogs_breed')
const { createReviews } = require('./reviews')
//const { createUser } = require('./users')
const { createOrders, getOrders } = require('./orders');
const { createProduct,  getProduct } = require('./products')
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

async function populateInitialDogData() {
  try {
    console.log("Creating Dogs...");
    const seedDataDogs = [
      { 
        id: 1,
        name: "Fido",
        description: "a classic great dog",
        price: 125,
        age: 2,
      },
      { 
        id: 2,
        name: "Bella",
        description: "smart and witty",
        price: 125,
        age: 2,
      },
      { 
        id: 3,
        name: "Charlie",
        description: "loves to play fetch",
        price: 125,
        age: 2,
      },
      { 
        id: 4,
        name: "Lucy",
        description: "fast and playful",
        price: 125,
        age: 2,
      },
      { 
        id: 5,
        name: "Duke",
        description: "a beautiful hairy dog",
        price: 125,
        age: 2,
      },
      { 
        id: 6,
        name: "Molly",
        description: "loves to hangout in the sunshine",
        price: 125,
        age: 2,
      },
      { 
        id: 7,
        name: "JoJo",
        description: "a great cuddler",
        price: 125,
        age: 2,
      },
      { 
        id: 8,
        name: "Oliver",
        description: "a very sophisticated animal",
        price: 125,
        age: 2,
      },
      { 
        id: 9,
        name: "Penny",
        description: "a bit ferocious but a nice dog",
        price: 125,
        age: 2,
      },
      { 
        id: 10,
        name: "Zeus",
        description: "the king of all dogs",
        price: 125,
        age: 2,
      },
      { 
        id: 11,
        name: "Scout",
        description: "the best adventure dog in the world",
        price: 125,
        age: 2,
      },
      { 
        id: 12,
        name: "Crinkles",
        description: "the most lovable face ever",
        price: 125,
        age: 2,
      },
      { 
        id: 13,
        name: "Moose",
        description: "big, cuddly and hairy",
        price: 125,
        age: 2,
      },
      { 
        id: 14,
        name: "Dexter",
        description: "too smart for his own good",
        price: 125,
        age: 2,
      },
      { 
        id: 15,
        name: "Bandit",
        description: "he'll still your food, but you'll still love him",
        price: 125,
        age: 2,
      },
      { 
        id: 16,
        name: "Oakley",
        description: "a pretty amazing dog",
        price: 125,
        age: 2,
      },
      { 
        id: 17,
        name: "Ace",
        description: "always comes through when you need him",
        price: 125,
        age: 2,
      },
      { 
        id: 18,
        name: "Winnie",
        description: "old and wise",
        price: 125,
        age: 2,
      },
      { 
        id: 19,
        name: "Dakota",
        description: "the perfect mountain dog for your backpacking adventures",
        price: 125,
        age: 2,
      },
      { 
        id: 20,
        name: "Sunny",
        description: "always smiling, making you laugh",
        price: 125,
        age: 2,
      }
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
    ];

    const launchSeedDataBreeds = await Promise.all(seedDataBreeds.map((breed) => createBreed(breed)));
    console.log("Here are your seeded breeds:", launchSeedDataBreeds)
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

    console.log("Dog and Breed connection created: ", firstDogBreed);
    console.log("Dog and Breed connection created: ", secondDogBreed);
    console.log("Dog and Breed connection created: ", thirdDogBreed);
    console.log("Finished creating dog and breed connection!");

    const testGetAllDogBreeds = await getAllDogBreeds(1);
    console.log("Test to see if testGetAllDogBreeds works", testGetAllDogBreeds);

    const testDogBreedById = await getDogBreedById(1);
    console.log("Test to see if testDogById works", testDogBreedById);

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
        content: "This is a test"
      },
    ];

    const launchSeedDataReviews = await Promise.all(seedDataReviews.map((review) => createReviews(review)));
    console.log("Here are your seeded reviews:", launchSeedDataReviews)

  } catch (error) {
    throw error;
  }
}

// async function populateInitialUsers() {
//   try {
//     console.log("Creating users...");
//     // create useful starting data
//     const seedUsers = [
//       {
//         id: 1,
//         firstName: "Bob",
//         lastName: "Smith",
//         email: "bobswag@gswag.com",
//         username: "bobbyboi",
//         password: "swag",
//         isAdmin: false
//       },
//       {
//         id: 2,
//         firstName: "Admin",
//         lastName: "Admin",
//         email: "Admin@admin.com",
//         username: "Admin",
//         password: "Admin",
//         isAdmin: true
//       },
//       {
//         id: 3,
//         firstName: "Michael",
//         lastName: "Scott",
//         email: "dundermifflin@gmail.com",
//         username: "michaelscott",
//         password: "password",
//         isAdmin: false,
//       }
//     ]
//     const launchUsers = await Promise.all(seedUsers.map((order) => createUser(user)))
//     console.log('Here are your initial users:', launchUsers)
//   } catch (error) {
//     throw error;
//   }
// };

async function populateInitialProducts() {
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
  .then(populateInitialDogData)
  .then(populateInitialBreedData)
  .then(populateInitialDogBreedData)
  .then(populateInitialReviews)
  //.then(populateInitialUsers)
  .then(populateInitialProducts)
  .then(populateInitialOrders)
  .then(populateInitialOrderProducts)
  .catch(console.error)
  .finally(() => client.end());