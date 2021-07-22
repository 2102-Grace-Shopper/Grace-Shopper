const { client } = require("./client");

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

module.exports = {
    client,
    createReviews,
}