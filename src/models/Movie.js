const mongoose = require("mongoose");

// movie schema
const movieSchema = new mongoose.Schema(
  {
    // movie title
    title: {
      type: String,
      required: true,
      maxlength: [50, "Name can't be longer than 50 characters"],
    },
    rating: {
      type: Number,
      require: true,
    },

    genre: {
      type: String,
      require: true,
    },

    director: {
      type: String,
      reuired: true,
    },
  },
  // replacing of Date.now. Gives created at and updated at
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
