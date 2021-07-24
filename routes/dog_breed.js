const dog_breedRouter = require('express').Router();
const { getAllDogBreeds } = require("../db/index")

// GET REQUESTS -----------------------------------------------

    //Works!
    dog_breedRouter.get("/:dogId/dogs", async (req, res, next) => {
        try {
        const { dogId } = req.params;
    
        const breedsFromDogs = await getAllDogBreeds(dogId);
        res.send(breedsFromDogs);
        } catch (error) {
        throw error;
        }
    });

// POST REQUESTS -----------------------------------------------       


// PATCH REQUESTS -----------------------------------------------


// DELETE REQUESTS -----------------------------------------------   

module.exports = dog_breedRouter