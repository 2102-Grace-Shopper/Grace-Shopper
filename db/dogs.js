const { client } = require("./client");

const createDogs = async ({name, description, price, age = []}) => {
    try {
    const { rows: [dogs] } = await client.query(`
      INSERT INTO dogs (name, description, price, age)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [name, description, price, age]);
  
    return dogs;

    } catch (error) {
      throw error;
    }
  };


module.exports = {
    createDogs,
}