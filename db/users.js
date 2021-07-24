const { client } = require('./client');
const bcrypt = require('bcrypt')
// const db = require('../db');
SALT_COUNT = 10

async function createUser({
    firstName,
    lastName,
    email,
    username,
    password,
    isAdmin 
  }) {
    try {
      const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
      password = hashedPassword;
      const {
        rows: [user],
      } = await client.query(
        `
        INSERT INTO users (firstName, lastName, email, username, password, isAdmin)
        VALUES($1, $2, $3, $4, $5, $6) 
        RETURNING *;
          `,
        [firstName,lastName, email, username, password, isAdmin,]
      );
  
    //   delete user.password;
    //   console.log(user, "my user");
      return user;
    } catch (error) {
      throw error;
    }
  };
  
  async function getAllUsers() {
    try {
      const { rows } = await client.query(`
          SELECT id, username, email, password
          FROM users;
        `);
  
      return rows;
    } catch (error) {
      console.error("could not get users", error);
      throw error;
    }
  };
  
  async function getUserByEmail(email) {
    try {
      const {
        rows: [user],
      } = await client.query(
        `
          SELECT *
          FROM users
          WHERE email=$1
        `,
        [email]
      );
  
      return user;
    } catch (error) {
      console.error("could not get user email", error);
      throw error;
    }
  };
  
  async function updateUser(usersId, fields = {}) {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");
    try {
      if (setString.length > 0) {
        if ("password" in fields) {
          fields.password = await bcrypt.hash(fields.password, SALT_COUNT);
        }
        await client.query(
          `
          UPDATE users
          SET ${setString}
          WHERE id=${usersId}
          RETURNING *;
        `,
          Object.values(fields)
        );
      }
      return await getUserById(usersId);
    } catch (error) {
      console.error("could not update user", error);
      throw error;
    }
  };
  
  async function getUserByUsername(username) {
    try{
      const {
        rows: [user],
      } = await client.query(`
      SELECT * FROM users
      WHERE username=$1
      `, 
      [username]
  );
  return user;
      }catch (error) {
        console.error("could not get user by username", error);
        throw error
      }
  };

  module.exports = {
    client,
    createUser,
    getAllUsers,
    getUserByEmail,
    updateUser,
    getUserByUsername
  }