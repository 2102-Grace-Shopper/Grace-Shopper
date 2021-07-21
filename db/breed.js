const { client } = require("./client");

async function createBreed(breed) {
    const {name, id} = breed;
    try{
        const {rows: [breed]} = await client.query(`
        INSERT INTO breeds(name, id)
        VALUES($1 $2)
        RETURNING *
        `, [name, id])
        return breed;
    } catch (error) {
        throw error
    }
}

async function getAllBreeds(){
    try{
    const {rows} = await client.query(`
    SELECT *
    FROM breeds
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
            FROM breeds
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