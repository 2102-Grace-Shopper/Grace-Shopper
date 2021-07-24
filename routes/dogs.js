const dogsRouter = require('express').Router();
const { getAllDogs, getDogById, getDogByDogName, updateDog, deleteDog } = require("../db/index")

dogsRouter.get("/", async (req, res, next) => {

    try {
      const dogs = await getAllDogs()

    res.send({
      dogs : dogs
    })
    } catch (error) {
      throw error
    }
  })

module.exports = dogsRouter