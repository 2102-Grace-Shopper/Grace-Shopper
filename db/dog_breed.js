const { client } = require("./client");

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

      // console.log("This is the createDogBreed() Test: ", rows)
  
      return rows;
    } catch (error) {
      throw error;
    }
  };

//   createDogBreed(1, 2)

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

      // console.log("This is the getDogBreedById() Test: ", dog_breed)
  
      return dog_breed;
    } catch (error) {
      throw error;
    }
  };

//   getDogBreedById(1)

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
  
      console.log("dogId", dogId);
      console.log("rows", rows.length);
  
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

