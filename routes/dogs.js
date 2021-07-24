const dogsRouter = require('express').Router();
const { getAllDogs, getDogById, getDogsByBreadName, updateDog, deleteDog } = require("../db/index")

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



module.exports = dogsRouter