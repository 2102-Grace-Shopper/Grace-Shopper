const { client } = require("./client");

//Works!
async function createBreed(breed) {
    const {id, name} = breed;
    try{
        const {rows: [breed]} = await client.query(`
        INSERT INTO breed(id, name)
        VALUES($1, $2)
        RETURNING *
        `, [id, name])

        return breed;
    } catch (error) {
        throw error
    }
}

//Works!
async function getAllBreeds(){
  try{
  const {rows} = await client.query(`
  SELECT *
  FROM breed
  `)

  return rows
}   catch (error) {
  throw error
}
}

//Works!
const getBreedById = async breedId => {
  try {
      const { rows: [ breed ] } = await client.query(`
          SELECT *
          FROM breed
          WHERE id=$1;
      `, [ breedId ]);

      return breed;
  } catch (err) {
      throw err;
  }
}

//Needs Help
const createBreeds = async (breedList) => {
    if (breedList.length === 0) return;
  
    const insertValues = breedList.map((_, index) => `$${index + 1}`).join("), (");

    // console.log(insertValues)
    const selectValues = breedList.map((_, index) => `$${index + 1}`).join(", ");
  
    //Try to remove parenths in Values
    try {
      await client.query(
        `
      INSERT INTO breed (name) 
      VALUES (${insertValues}) 
      ON CONFLICT (name) DO NOTHING
      returning *;
      `,
        breedList
      );
  
      // const { rows } = await client.query(
      //   `
      //   SELECT * 
      //   FROM breed
      //   WHERE name
      //   IN (${selectValues})
      //   `,
      //   breedList
      // );

    //   console.log("This is the createBreeds() Test: ", rows)
  
      return rows;
    } catch (error) {
      throw error;
    }
  };

//   createBreeds("Shiba Inu", "Great Dane")

// Works!
const deleteBreed = async (id) => {
  try {
    await client.query(
      `
      DELETE FROM breed
      WHERE id = $1;
      `,
      [id]
    );

  } catch (error) {
    throw error;
  }
};



module.exports = {
    createBreed,
    getAllBreeds,
    getBreedById,
    // createBreeds,
    deleteBreed
}