const { client } = require("./client");
const { createDogBreed } = require("./dogs_breed");
const { createBreed } = require("./breed");

const addBreedsToDog = async({dogId, breedId}) => {
    console.log(dogId, breedId);
    try {
        const {rows} = await client.query(`
            INSERT INTO dogs_breed ("dogId", "breedId")
            VALUES($1, $2)
            ON CONFLICT ("dogId","breedId") DO NOTHING
            RETURNING *;
        `,[dogId,breedId])
        return rows;
    } catch (error) {
        console.error(error)
        throw error
    }
}

addBreedsToDog(7, 3)


// Works!
const createDogs = async ({name, description, price, age = []}) => {
    try {
    const { rows: [dogs] } = await client.query(`
      INSERT INTO dogs (name, description, price, age)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [name, description, price, age]);
  
    // console.log("This is the createDogs() Test: ", dogs)

    return dogs;

    } catch (error) {
      throw error;
    }
  };

//   createDogs()

// Works!
  const getAllDogs = async () => {
    try {
        const { rows } = await client.query(`
          SELECT * 
          FROM dogs;
          `);
    
          console.log("This is the getAllDogs() Test: ", rows)

        return rows;
      } catch (error) {
        throw error;
      }
  }

  getAllDogs()

  //Works! Just need to test breeds
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

      console.log("This is the getDogById() Test: ", dog)
  
      if (!dog) {
        throw {
          name: "Dog not found",
          message: "Could not find dog with that dogId",
        };
      }
  
    //   const { rows: breed } = await client.query(
    //     `
    //     SELECT breed.*
    //     FROM breed
    //     JOIN dog_breed ON breed.id = dog_breed."breedId"
    //     WHERE dog_breed."dogId" = $1;
    //     `,
    //     [dogId]
    //   );
  
    //   dog.breed = breed;
  
      return dog;
    } catch (error) {
      throw error;
    }
  };

  getDogById(1)

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


<<<<<<< HEAD
    //   const updateDog = async (dogId, fields = {}) => {
    //     const { breeds } = fields;
    //     delete fields.breeds;
=======
  //Needs Help -- Need to test
  const updateDog = async (dogId, fields = {}) => {
        const { breeds } = fields;
        delete fields.breeds;
>>>>>>> 3f644327c00f3703533ff1da8f42a5f5b8b038e1
      
    //     const setString = Object.keys(fields)
    //       .map((key, index) => `"${key}"=$${index + 1}`)
    //       .join(", ");
      
    //     if (setString.length === 0) return;
      
    //     try {
    //       if (setString.length > 0) {
    //         await client.query(
    //           `
    //             UPDATE dogs
    //             SET ${setString}
    //             WHERE id = ${dogId}
    //             RETURNING *;
    //             `,
    //           Object.values(fields)
    //         );
    //       }
      
    //       // Returns early if there are no breeds to update
    //       if (breeds === undefined) {
    //         return await getDogById(dogId);
    //       }
      
    //       // Make any new breeds that need to be made -- need createBreeds from Rene
    //       const breedList = await createBreed(breeds);
    //       const breedListIdString = breedList.map((breed) => `${breed.id}`).join(", ");
      
    //       await client.query(
    //         `
    //         DELETE FROM dog_breed
    //         WHERE "breedId"
    //         NOT IN (${breedListIdString})
    //         AND "dogId" = $1;
    //         `,
    //         [dogId]
    //       );
      
    //       // Create dog_breed as necessary 
    //       await addBreedsToDog(dogId, breedList);
      
    //       return await getDogById(dogId);
    //     } catch (error) {
    //       throw error;
    //     }
    //   };

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

        //   console.log("This is the deleteDog() Test: ", id)

        } catch (error) {
          throw error;
        }
      };

      deleteDog()


module.exports = {
    addBreedsToDog,
    createDogs,
    getAllDogs,
    getDogById,
    // updateDog,
    // getDogByDogName,
    deleteDog
}