const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  getMoviesbyId,
  updateMovies,
  deleteMovies,
  createMovies,
} = require("../controller/movieController");

let books = [];
// localhost: 3000/api/v1/books
router.get("/:id", getMoviesbyId);

router.get("/", getAllMovies);

router.post("/", createMovies);

router.put("/:id", updateMovies);

router.delete("/:id", deleteMovies);

module.exports = router;
