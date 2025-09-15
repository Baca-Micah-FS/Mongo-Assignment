const mongoose = require("mongoose");
const Movie = require("./Movie");

const directorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minLength: [2, "Name must be longer than 2 characters"],
      maxlength: [50, "Name can't be longer than 50 characters"],
    },
    birthDate: {
      type: Date,
      required: true,
    },

    moviesDirected: {
      type: Number,
      required: true,
    },

    retired: {
      type: Boolean,
      required: true,
    },

    movie: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  },
  // replacing of Date.now. Gives created at and updated at
  { timestamps: true }
);

module.exports = mongoose.model("Director", directorSchema);
