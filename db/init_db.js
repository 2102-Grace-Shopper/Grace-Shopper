// code to build and initialize DB goes here
const {client} = require('./client');
const {createUsers} = require('./users')

async function buildTables() {
  try {
    client.connect();

    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      isAdmin BOOLEAN DEFAULT false)
    `);
    // drop tables in correct order
    // build tables in correct order

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
        isAdmin: false,
      }
    ]
    const launchUsers = await Promise.all(seedUsers.map((order) => createUsers(user)))
  } catch (error) {
    throw error;
  }
};

buildTables()
  .then(populateInitialUsers)
  .catch(console.error)
  .finally(() => client.end());