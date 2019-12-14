const Router = require("express-promise-router");

const db = require("../db");

const router = new Router();

module.exports = router;

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if(id){
    const ratingData = await db.query({
      text: "SELECT average_rating FROM rating_graphic_view WHERE product_id = $1",
      values: [id]
    });
    console.log("Search dropdown rating data fresh from db: ", ratingData);
    res.send(ratingData.rows[0]);
  } else {
    res.send({})
  }
  
});