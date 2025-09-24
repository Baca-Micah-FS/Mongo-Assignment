const express = require("express");
const router = express.Router();
const {
  getAllDirectors,
  getDirectorsbyId,
  updateDirectors,
  deleteDirectors,
  createDirectors,
} = require("../controller/directorController");

let books = [];
// localhost: 3000/api/v1/books
router.get("/:id", getDirectorsbyId);

router.get("/", getAllDirectors);

router.post("/", createDirectors);

router.put("/:id", updateDirectors);

router.delete("/:id", deleteDirectors);

module.exports = router;
