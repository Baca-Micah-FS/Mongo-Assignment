const Director = require("../models/Director");
const Movie = require("../models/Movie");
const Messages = require("../models/Messages");

// mongoose import for .isValidObjectId
const mongoose = require("mongoose");

const getAllDirectors = async (request, response) => {
  try {
    const director = await Director.find({})
      .select(["name", "birthDate", "moviesDirected", "retired"])
      .populate({
        path: "movies",
        select: ["title", "rating", "genre", "releaseDate", "directors"],
      });
    response.status(200).json({
      message: `${request.method} ${Messages.successfulDirectorMessage}`,
      director: director,
      success: true,
    });
  } catch (error) {
    response.status(400).json({ message: error.message, success: false });
  }
};

const getDirectorsbyId = async (request, response) => {
  try {
    const { id } = request.params;
    // Practicing using .isValidObjectId to prevent cast errors. Without check it could return a 500 bad request instead of a 400 status code.
    if (!mongoose.isValidObjectId(id)) {
      return response
        .status(400)
        .json({ messages: Messages.invalidDirectorId, success: false });
    }
    const director = await Director.findById(id)
      .select(["name", "birthDate", "moviesDirected", "retired"])
      .populate({
        path: "movies",
        select: ["title", "rating", "genre", "releaseDate", "directors"],
      });
    if (director == null) {
      return response.status(404).json({
        message: `${Messages.directorNotFound}`,
        success: false,
      });
    } else {
      response.status(200).json({
        message: `${request.method} ${Messages.successfulDirectorMessage}`,
        director: director,
        success: true,
      });
    }
  } catch (error) {
    response.status(400).json({ message: error.message, success: false });
  }
};

const createDirectors = async (request, response) => {
  try {
    const created = await Director.create(request.body);

    const director = await Director.findById(created._id)
      .select(["name", "birthDate", "moviesDirected", "retired"])
      .populate({
        path: "movies",
        select: ["title", "rating", "genre", "releaseDate", "directors"],
      });
    response.status(200).json({
      message: `${request.method} ${Messages.successfulDirectorMessage}`,
      success: true,
      director: director,
    });
  } catch (error) {
    response.status(400).json({ message: Messages.badRequest, success: false });
  }
};

const updateDirectors = async (request, response) => {
  try {
    const director = await Director.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .select(["name", "birthDate", "moviesDirected", "retired"])
      .populate({
        path: "movies",
        select: ["title", "rating", "genre", "releaseDate", "directors"],
      });
    response.status(200).json({
      message: `${request.method} ${Messages.successfulDirectorMessage}`,
      success: true,
      director: director,
    });

    if (!director) {
      return response
        .status(404)
        .json({ message: Messages.directorNotFound, success: false });
    }

    return response.status(200).json({
      message: `${request.method} ${Messages.successfulDirectorMessage}`,
      success: true,
      director: director,
    });
  } catch (error) {
    response.status(400).json({ message: error.message, success: false });
  }
};

const deleteDirectors = async (request, response) => {
  try {
    const deleted = await Director.findByIdAndDelete(request.params.id);
    if (!deleted) {
      return response
        .status(404)
        .json({ message: Messages.directorNotFound, success: false });
    }
    return response.status(200).json({
      message: `${request.method} ${Messages.successfulDirectorMessage}`,
      success: true,
    });
  } catch (error) {
    response.status(400).json({ message: error.message, success: false });
  }
};

module.exports = {
  getAllDirectors,
  getDirectorsbyId,
  updateDirectors,
  deleteDirectors,
  createDirectors,
};
