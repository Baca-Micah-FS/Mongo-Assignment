const Movie = require("../models/Movie");

const getAllMovies = async (request, response) => {
  try {
    const movies = await Movie.find({});
    response.status(200).json({
      message: `${request.method} verb to the Movie controller`,
      movies: movies,
      sucess: true,
    });
  } catch (error) {
    response.status(400).json({ message: error.message, success: false });
  }
};

const getMoviesbyId = async (request, response) => {
  try {
    const movie = await Movie.findById(request.params.id);
    response.status(200).json({
      message: `${request.method} Get Movies by ID`,
      movie: movie,
      success: true,
    });
  } catch (error) {
    response.status(400).json({ message: error.message, success: false });
  }
};

const createMovies = async (request, response) => {
  try {
    const movie = await Movie.create(request.body);
    response.status(200).json({
      message: `${request.method} Create Movies`,
      success: true,
      movie: movie,
    });
  } catch (error) {
    response.status(400).json({ message: error.message, success: false });
  }
};

const updateMovies = async (request, response) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
      }
    );
    response.status(200).json({
      message: `${request.method} Update Movies`,
      success: true,
      movie: movie,
    });
  } catch (error) {
    response.status(400).json({ message: error.message, success: false });
  }
};

const deleteMovies = async (request, response) => {
  try {
    await Movie.findByIdAndDelete(request.params.id);
    response
      .status(200)
      .json({ message: `${request.method} Delete Movies`, success: true });
  } catch (error) {
    response.status(400).json({ message: error.message, success: false });
  }
};

module.exports = {
  getAllMovies,
  getMoviesbyId,
  updateMovies,
  deleteMovies,
  createMovies,
};
