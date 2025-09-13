const mongoose = require("mongoose");

const directorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: [50, "Name can't be longer than 50 characters"],
    },
    birthDate: {
      type: Number,
      require: true,
    },

    moviesDirected: {
      type: Number,
      require: true,
    },

    retired: {
      type: Boolean,
      reuired: true,
    },
  },
  // replacing of Date.now. Gives created at and updated at
  { timestamps: true }
);

module.exports = mongoose.model("Director", directorSchema);
