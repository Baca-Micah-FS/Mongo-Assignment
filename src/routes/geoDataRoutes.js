const express = require("express");
const router = express.Router();
const {
  getAllGeoData,
  getGeoDataById,
  updateGeoData,
  deleteGeoData,
  createGeoData,
} = require("../controller/geoDataController");

router.get("/:id", getGeoDataById);

router.get("/", getAllGeoData);

router.post("/", createGeoData);

router.put("/:id", updateGeoData);

router.delete("/:id", deleteGeoData);

module.exports = router;
