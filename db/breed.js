const { client } = require("./client");

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

  createBreed();



module.exports = {
    createBreed,
}