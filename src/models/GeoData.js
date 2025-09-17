const mongoose = require("mongoose");

const geoDataSchema = new mongoose.Schema(
  {
    source: { type: String, trim: true },

    lat: { type: Number, required: true },

    lng: { type: Number, required: true },

    city: { type: String, trim: true },

    country: { type: String, trim: true },

    temp: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GeoData", geoDataSchema);
