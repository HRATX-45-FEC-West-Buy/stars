const express = require("express");
const mountRoutes = require("./routes");
const cors = require("cors");
const axios = require("axios");
const port = 7000;

// writeReviews.writeReviews();
// writeOverview.writeOverviewData();
// writeSpecs.writeSpecs();

const app = express();

app.use(express.static(__dirname + "/../client/dist"));
app.use(express.json());
app.use(cors());

mountRoutes(app);

app.listen(port, () => {
  console.log("Now listening on port " + port + "!");
});
