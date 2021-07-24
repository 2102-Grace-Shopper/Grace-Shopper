const { client } = require("./client");

// Works!
const createReviews = async ({title, content = []}) => {
    try {
    const { rows: [reviews] } = await client.query(`
      INSERT INTO reviews (title, content)
      VALUES ($1, $2)
      RETURNING *;
    `, [title, content]);
  
    // console.log("This is the createReviews() Test: ", reviews)

    return reviews;

    } catch (error) {
      throw error;
    }
  };

  // Works!
  async function getReviews() {
    try {
        const { rows } = await client.query(`
        SELECT * 
        FROM reviews;
        `);

        // console.log("This is the getReviews() Test: ", rows)

        return rows;
    } catch (error) {
        throw error
    }
}

// getReviews()

// Works!
async function getReviewsById(id) {
    try {
        const { rows: [review] } = await client.query(`
        SELECT * FROM reviews
        WHERE id = $1;
        `, [id])

        console.log("This is the getReviewsById() Test: ", review)

        return review;
    } catch (error) {
        throw error;
    }
}

// getReviewsById(1)

async function getReviewsByProducts({id}) {
    try {

    } catch (error) {
        throw error;
    }
}

async function getReviewsByUsers({id}) {
    try {

    } catch (error) {
        throw error;
    }
}



// async function updateOrder({id, ...fields}) {
//     const setString = Object.keys(fields).map((key, index) => `"${ key }"=$${ index + 1}`
//     ).join(', ');

//     const objVals = Object.values(fields)

//     if(setString.length === 0) {
//         return;
//     } 
//     objVals.push(id)

//     try {
//         if(setString.length > 0) {
//             const { rows: [order] } = await client.query(`
//             UPDATE orders
//             SET ${setString}
//             WHERE id=$${objVals.length}
//             RETURNING *;
//             `, objVals);

//             return order
//         }
//     } catch (error) {
//         throw error;
//     }

// }

//Works!
const deleteReview = async (id) => {
    try {
      await client.query(
        `
        DELETE FROM reviews
        WHERE id = $1;
        `,
        [id]
      );

    //   console.log("This is the deleteReview() Test: ", id)

    } catch (error) {
      throw error;
    }
  };

//   deleteReview(1)


module.exports = {
    createReviews,
    getReviews,
    getReviewsById,
    deleteReview
}