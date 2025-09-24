const express = require("express");
const router = express.Router();
const movieRoutes = require("./movieRoutes");
const directorRoutes = require("./directorRoutes");
// OR
// const router = require("express").Router

// using app/v1 route
router.get("/", (request, response) => {
  response
    .status(200)
    .json({ message: "using file src/routes/index", success: true });
});

router.use("/movies", movieRoutes);
router.use("/directors", directorRoutes);

module.exports = router;
