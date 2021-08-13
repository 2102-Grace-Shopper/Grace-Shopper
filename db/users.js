const { client } = require('./client');
const bcrypt = require('bcrypt')
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
      return user;
    } catch (error) {
      throw error;
    }
  };


  async function getUser({username, password}) {
    try {
      const { rows: [user]} = await client.query(`
      SELECT *
      FROM userss
      WHERE username=$1
      `, [username])

      const isMatch = await bcrypt.compare(password, user.password)
      if(isMatch) {
        console.log('Success Password matches')
        delete user.password;
        return user
      } else if (!isMatch) {
        console.log('Sorry, that password does not match')
      }
    } catch (error) {
      throw error;
    }
  }

  async function getAllUsers() {
    try {
      const { rows } = await client.query(`
          SELECT *
          FROM users
        `);

      return rows;
    } catch (error) {
      console.error("could not get users", error);
      throw error;
    }
  };

  async function getUserById(userId) {
    try {
      const {
        rows: [user],
      } = await client.query(
        `
          SELECT *
          FROM users
          WHERE id=${userId}
        `,
        [user]
      );

      return user;
    } catch (error) {
      console.error("could not get user", error);
      throw error;
    }
  };


  async function getUserByUsername(username) {
    try {
      const {rows} = await client.query(`
      SELECT *
      FROM users
      WHERE username=$1
      `,[username]);

      if(!rows || !rows.length){
          return null
      }
      const [user] = rows;
      return user;
  }catch (error) {
      throw error;
  }
};


  async function loginUser(username, password) {
    try {

      const { rows: [user] } = await client.query(`
        SELECT * FROM users 
        WHERE username=$1;
      `, [username])
        console.log("this is the user:", user)
      if (!user) {
        return null;
      }

      const correctPW = await bcrypt.compare(password, user.password);
      if (!correctPW) {
        return null;
      }

      return user;
    } catch (error) {
      throw error;
    }
  };


  module.exports = {
    client,
    createUser,
    getUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    loginUser
  };