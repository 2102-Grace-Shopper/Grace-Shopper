const { client } = require("./client");
const { createDogBreed } = require("./dog_breed");
const { createBreeds } = require("./breed");

const addBreedsToDog = async (dogId, breedList = []) => {
    try {
      const createDogBreedPromises = breedList.map((breed) =>
        createDogBreed(dogId, breed.id)
      );
  
      await Promise.all(createDogBreedPromises);
  
      return await getDogById(dogId);
    } catch (error) {
      throw error;
    }
  };

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

  const getAllDogs = async () => {
    try {
      const { rows: dogIds } = await client.query(`
        SELECT id
        FROM dogs
      `);
  
      const dogs = await Promise.all(dogIds.map(
        dog => getDogById(dog.id)
      ));
  
      return dogs;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  const getDogById = async (dogId) => {
    try {
      const {
        rows: [dog],
      } = await client.query(
        `
        SELECT * 
        FROM dogs
        WHERE id = $1;
        `,
        [dogId]
      );
  
      if (!dog) {
        throw {
          name: "Dog not found",
          message: "Could not find dog with that dogId",
        };
      }
  
      const { rows: breed } = await client.query(
        `
        SELECT breed.*
        FROM breed
        JOIN dog_breed ON breed.id = dog_breed."breedId"
        WHERE dog_breed."dogId" = $1;
        `,
        [dogId]
      );
  
      dog.breed = breed;
  
      return dog;
    } catch (error) {
      throw error;
    }
  };

  const getDogByDogName = async (breed) => {
    try {
      const { rows: dogs } = await client.query(
        `
          SELECT dogs.id
          FROM dogs
          JOIN dog_breed ON dogs.id = dog_breed."dogId"
          JOIN breed ON breed.id = dog_breed."breedId"
          WHERE breed.breed = $1;
          `,
        breed
      );
  
      return await Promise.all(dogs.map((dog) => getDogById(dog.id)));
    } catch (error) {}
  };


      const updateDog = async (dogId, fields = {}) => {
        const { breeds } = fields;
        delete fields.breeds;
      
        const setString = Object.keys(fields)
          .map((key, index) => `"${key}"=$${index + 1}`)
          .join(", ");
      
        if (setString.length === 0) return;
      
        try {
          if (setString.length > 0) {
            await client.query(
              `
                UPDATE dogs
                SET ${setString}
                WHERE id = ${dogId}
                RETURNING *;
                `,
              Object.values(fields)
            );
          }
      
          // Returns early if there are no breeds to update
          if (breeds === undefined) {
            return await getDogById(dogId);
          }
      
          // Make any new breeds that need to be made -- need createBreeds from Rene
          const breedList = await createBreeds(breeds);
          const breedListIdString = breedList.map((breed) => `${breed.id}`).join(", ");
      
          await client.query(
            `
            DELETE FROM dog_breed
            WHERE "breedId"
            NOT IN (${breedListIdString})
            AND "dogId" = $1;
            `,
            [dogId]
          );
      
          // Create dog_breed as necessary 
          await addBreedsToDog(dogId, breedList);
      
          return await getDogById(dogId);
        } catch (error) {
          throw error;
        }
      };

      const deleteDog = async (id) => {
        try {
          await client.query(
            `
            DELETE FROM dogs
            WHERE id = $1;
            `,
            [id]
          );
        } catch (error) {
          throw error;
        }
      };


module.exports = {
    addBreedsToDog,
    createDogs,
    getAllDogs,
    getDogById,
    updateDog,
    getDogByDogName,
    deleteDog
}