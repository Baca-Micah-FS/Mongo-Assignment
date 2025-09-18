//Mongoose Scehema for stored data from API

const mongoose = require("mongoose");

// Variable definitions for each stored record from API
const geoDataSchema = new mongoose.Schema(
  {
    source: { type: String, trim: true },

    lat: { type: Number, required: true },

    lng: { type: Number, required: true },

    city: { type: String, trim: true },

    country: { type: String, trim: true },

    temp: { type: Number },
  },

  // Timestamps used so we can filter by created at and updated at in controllers
  { timestamps: true }
);

module.exports = mongoose.model("GeoData", geoDataSchema);
