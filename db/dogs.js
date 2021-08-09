const { client } = require("./client");
const { createDogBreed } = require("./dog_breed");
const { createBreed } = require("./breed");


const addBreedToDog = async ({dogId, breedId}) => {
  // console.log(dogId, breedId);
  try {

    const {rows} = await client.query(`
      INSERT INTO dog_breed("dogId", "breedId")
      VALUES ($1, $2)
      ON CONFLICT ("dogId", "breedId") DO NOTHING
      RETURNING *;
    `, [ dogId, breedId ])
    // console.log("This your addBreedToDog() solution: ", rows);

    return rows;
  } catch (error) {
    throw error
  }
}
// addBreedToDog(5,3)
  

// Works!
const createDogs = async ({name, description, price, age, imageURL = []}) => {
    try {
    const { rows: [dogs] } = await client.query(`
      INSERT INTO dogs (name, description, price, age, "imageURL")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `, [name, description, price, age, imageURL]);

    return dogs;

    } catch (error) {
      throw error;
    }
  };

// Works!
  const getAllDogs = async () => {
    try {
        const { rows } = await client.query(`
          SELECT * 
          FROM dogs;
          `);

        return rows;
      } catch (error) {
        throw error;
      }
  }


  //Works! Breeds section needs help
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
  
    // Still in progress -- throwing error in code. Needs help.

    //   const { rows: [breed] } = await client.query(`
    //     SELECT breed.*
    //     FROM breed
    //     JOIN dog_breed ON breed.id = dog_breed."breedId"
    //     WHERE dog_breed."dogId" = $1;
    //     `,
    //     [dogId]
    //   );

    //   dog.breed = breed;
    //   console.log("This is the getDogById() Test: ", breed)
  
      return dog;
    } catch (error) {
      throw error;
    }
  };

//   getDogById(1)



  //Works!    
  const getDogsByBreadName = async (name) => {
    try {
      const { rows: dogs } = await client.query(
        `
          SELECT dogs.id
          FROM dogs
          JOIN dog_breed ON dogs.id = dog_breed."dogId"
          JOIN breed ON breed.id = dog_breed."breedId"
          WHERE breed.name = $1;
          `,
        name
      );
  
      return await Promise.all(dogs.map((dog) => getDogById(dog.id)));
    } catch (error) {}
  };


  //Needs Help -- Need to test -- keep dogs and breeds seperate
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
      
          // Could put this in a new function (updateDogBreed())
          // Make any new breeds that need to be made -- need createBreeds from Rene
          const breedList = await createBreed(breeds);
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
          await addBreedToDog(dogId, breedId);
      
          return await getDogById(dogId);
        } catch (error) {
          throw error;
        }
    };

// Works!
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
    addBreedToDog,
    createDogs,
    getAllDogs,
    getDogById,
    updateDog,
    getDogsByBreadName,
    deleteDog
}