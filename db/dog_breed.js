const { client } = require("./client");

//Works!
const createDogBreed = async (dogId, breedId) => {
    console.log(dogId, breedId);
    try {
      const { rows } = await client.query(
        `
              INSERT INTO dog_breed ("dogId", "breedId")
              VALUES($1, $2)
              ON CONFLICT ("dogId","breedId") DO NOTHING
              RETURNING *;
          `,
        [dogId, breedId]
      );
  
      return rows;
    } catch (error) {
      throw error;
    }
  };

  //Works!
  const getDogBreedById = async (id) => {
    try {
      const {
        rows: [dog_breed],
      } = await client.query(
        `
          SELECT *
          FROM dog_breed
          WHERE id = $1;
          `,
        [id]
      );
  
      return dog_breed;
    } catch (error) {
      throw error;
    }
  };

  //Works!
  const getAllDogBreeds = async (dogId) => {
    try {
      const { rows } = await client.query(
        `
            SELECT d.id, b.name
            FROM dog_breed db
            JOIN breed b on db."breedId" = b.id
            JOIN dogs d ON db."dogId" = d.id
            WHERE d.id = $1;
        `,
        [dogId]
      );
  
      return rows;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  };

  module.exports = {
    createDogBreed,
    getDogBreedById,
    getAllDogBreeds
  };

