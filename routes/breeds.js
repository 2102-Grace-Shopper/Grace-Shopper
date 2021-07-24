const breedsRouter = require('express').Router();
const { getAllBreeds, getBreedById } = require("../db/index")

//Works!
breedsRouter.get("/", async (req, res, next) => {

    try {
      const breeds = await getAllBreeds()

    res.send({
      breeds : breeds
    })
    } catch (error) {
      throw error
    }
  });

    //Works!
    breedsRouter.get("/:id", async (req, res, next) => {

        const { id } = req.params
        console.log(id)
    
        try {
          const breedId = await getBreedById(id)
    
          res.send({
            breedId: breedId
          })
        } catch (error) {
          throw error
        }
      });


module.exports = breedsRouter