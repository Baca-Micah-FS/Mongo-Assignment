// GeoSpatial API.. Changing routes to geoSpatial API Data

const express = require("express");
const router = express.Router();
const geoDataRoutes = require("./geoDataRoutes");
// const movieRoutes = require("./movieRoutes");
// const directorRoutes = require("./directorRoutes");

router.get("/", (request, response) => {
  response
    .status(200)
    .json({ message: "using file src/routes/index", success: true });
});

router.use("/geo-data", geoDataRoutes);

// UN COMMENT FOR USE OF MOVIE/DIRECTOR APP

// router.use("/movies", movieRoutes);
// router.use("/directors", directorRoutes);

module.exports = router;
