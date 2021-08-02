const reviewsRouter = require('express').Router();
const { createReviews, getReviews, getReviewsById, deleteReview  } = require("../db/index")

// GET REQUESTS -----------------------------------------------

    //Works!
    reviewsRouter.get("/", async (req, res, next) => {

        try {
        const reviews = await getReviews()

        res.send({
        reviews : reviews
        })
        } catch (error) {
        throw error
        }
    });

    //Works!
    reviewsRouter.get("/:id", async (req, res, next) => {

        const { id } = req.params
        console.log(id)

        try {
        const reviewId = await getReviewsById(id)

        res.send({
            reviewId: reviewId
        })
        } catch (error) {
        throw error
        }
    });

// POST REQUESTS -----------------------------------------------       

    
    reviewsRouter.post("/", async (req, res, next) => {
        const { title, content = [] } = req.body;
    
        const reviewData = {};
    
        try {
            reviewData.title = title;
            reviewData.content = content;
    
            const newReview = await createReviews(reviewData);
    
            if (reviewData) {
            res.send({ newReview });
        }
        } catch (error) {
        throw error;
        }
    });

// PATCH REQUESTS -----------------------------------------------



// DELETE REQUESTS -----------------------------------------------  

reviewsRouter.delete("/:id", async (req, res, next) => {
        
    try {

    const deleteThisReview = await deleteReview(id);
    console.log(deleteThisReview);

    } catch (error) {
    throw error;
    }
});

module.exports = reviewsRouter
