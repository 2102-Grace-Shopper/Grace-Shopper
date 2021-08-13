const dogsRouter = require('express').Router();
const { createDogs, getAllDogs, getDogById, getDogsByBreadName, updateDog, deleteDog } = require("../db/index")

// GET REQUESTS -----------------------------------------------

    //Works!
    dogsRouter.get("/", async (req, res, next) => {

        try {
        const dogs = await getAllDogs()

        res.send({
         dogs : dogs
        })
        } catch (error) {
        throw error
        }
    });

    //Works!
    dogsRouter.get("/:id", async (req, res, next) => {

        const { id } = req.params
            console.log(id)

        try {
        const dogId = await getDogById(id)

        res.send({
            dogId: dogId
        })
        } catch (error) {
        throw error
        }
    });

    // Needs Help
    //   dogsRouter.get("/:name", async (req, res, next) => {
    //     const { name } = req.params
    //     console.log(name)

    //     try {
    //       const breedName = await getDogsByBreadName(name)

    //       res.send({
    //         breadName: breadName
    //       })
    //     } catch (error) {
    //       throw error
    //     }
    //   });

// POST REQUESTS -----------------------------------------------

    
    dogsRouter.post("/", async (req, res, next) => {
        const { name, description, price, age = [] } = req.body;
    
        const dogData = {};
    
        if (breeds.length > 0) {
         dogData.breeds = breeds;
        }
    
        try {
            dogData.name = name;
            dogData.description = description;
            dogData.price = price;
            dogData.age = age;
    
            const newDog = await createDogs(dogData);
    
            if (dogData) {
            res.send({ newDog });
        }
        } catch (error) {
        throw error;
        }
    });

  
  // PATCH REQUESTS -----------------------------------------------

    //Currently Working On...
    dogsRouter.patch("/:id", async (req, res, next) => {
        
        const { postId } = req.params;
        const { title, content, tags } = req.body;

    });

  // DELETE REQUESTS -----------------------------------------------

    dogsRouter.delete("/:id", async (req, res, next) => {
        
        try {
    
         const deleteThisDog = await deleteDog(id);
            console.log(deleteThisDog);

        } catch (error) {
         throw error;
        }
    });


module.exports = dogsRouter