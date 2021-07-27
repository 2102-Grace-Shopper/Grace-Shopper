const { client } = require("./client");

// Works!
const createReviews = async ({title, content, userId, productId}) => {
  try {
  const { rows: [reviews] } = await client.query(`
    INSERT INTO reviews (title, content, "userId", "productId")
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `, [title, content, userId, productId]);

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


// Works!
async function getReviewsById(id) {
    try {
        const { rows: [review] } = await client.query(`
        SELECT * FROM reviews
        WHERE id = $1;
        `, [id])

        return review;
    } catch (error) {
        throw error;
    }
}


async function getReviewsByUsers({userId}) {
  try {
      const { rows: [user] } = await client.query(`
      SELECT reviews.*, users.username AS creatorname
      FROM users
      JOIN reviews ON reviews."userId"=users.Id
      WHERE reviews."userId"=${userId}
       `);
       return user;
  } catch (error) {
      throw error;
  }
}


//Works!
async function updateReview({id, ...fields}) {
    const setString = Object.keys(fields).map((key, index) => `"${ key }"=$${ index + 1}`
    ).join(', ');

    const objVals = Object.values(fields)

    if(setString.length === 0) {
        return;
    } 
    objVals.push(id)

    try {
        if(setString.length > 0) {
            const { rows: [review] } = await client.query(`
            UPDATE reviews
            SET ${setString}
            WHERE id=$${objVals.length}
            RETURNING *;
            `, objVals);

            return review
        }
    } catch (error) {
        throw error;
    }

}

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

    } catch (error) {
      throw error;
    }
  };


module.exports = {
    createReviews,
    getReviews,
    getReviewsById,
    getReviewsByUsers,
    updateReview,
    deleteReview
}