const mongoose = require("mongoose");
const Director = require("./Director");

// movie schema
const movieSchema = new mongoose.Schema(
  {
    // movie title
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: [2, "Name must be longer than 2 characters"],
      maxlength: [50, "Name can't be longer than 50 characters"],
    },
    rating: {
      type: Number,
      required: true,
      min: [0, "Rating cannot be lower than 0"],
      max: [5, "Rating cannot be higher than 5"],
    },

    genre: {
      // Wrap all type "strings" in "[]" if they are related to an enum with multiple values/strings
      type: [String],
      required: true,
      trim: true,
      enum: ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Other"],
    },

    releaseDate: {
      type: Date,
      required: true,
    },
    director: {
      // ref defines the "has a" relationship between every movie "has a" director
      type: mongoose.Schema.Types.ObjectId,
      ref: "Director",
      required: true,
    },
  },
  // replacing of Date.now. Gives created at and updated at
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
