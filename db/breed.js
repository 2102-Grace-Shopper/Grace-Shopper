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

module.exports = {
    createBreed,
    getAllBreeds,
    getBreedById
}