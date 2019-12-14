const Router = require("express-promise-router");

const db = require("../db");

const router = new Router();

module.exports = router;

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const reviewData = await db.query({
    text: "SELECT * FROM review_summary_view WHERE product_id = $1",
    values: [id]
  });
  console.log("Review data fresh from db: ", reviewData.rows[0]);
  res.send(reviewData.rows[0]);
});
