const Movie = require("../models/Movie");
const Director = require("../models/Director");
const Messages = require("../models/Messages");

const getAllMovies = async (request, response) => {
  try {
    const movies = await Movie.find({})
      .select(["title", "rating", "genre", "releaseDate", "directors"])
      .populate({
        path: "directors",
        select: ["name", "birthDate", "moviesDirected", "retired"],
      });

    response.status(200).json({
      message: `${request.method} ${Messages.successfulMovieMessage}`,
      movies: movies,
      success: true,
    });
  } catch (error) {
    response.status(400).json({ message: error.message, success: false });
  }
};

const getMoviesbyId = async (request, response) => {
  try {
    const movie = await Movie.findById(request.params.id)
      .select(["title", "rating", "genre", "releaseDate", "directors"])
      .populate({
        path: "directors",
        select: ["name", "birthDate", "moviesDirected", "retired"],
      });

    if (!movie) {
      return response
        .status(404)
        .json({ message: Messages.movieNotFound, success: false });
    }

    response.status(200).json({
      message: `${request.method} ${Messages.successfulMovieMessage}`,
      movie: movie,
      success: true,
    });
  } catch (error) {
    response
      .status(400)
      .json({ message: Messages.movieNotFound, success: false });
  }
};

const getMoviesByDirectorId = async (request, response) => {
  try {
    const directorId = request.params.directorId;
    const movies = await Movie.find({ directors: directorId })
      .select(["title", "rating", "genre", "releaseDate", "directors"])
      .populate({
        path: "directors",
        select: ["name", "birthDate", "moviesDirected", "retired"],
      });
    if (!movies) {
      return response
        .status(404)
        .json({ message: Messages.movieNotFound, success: false });
    }

    response.status(200).json({
      message: `${request.method} ${Messages.successfulMovieMessage}`,
      success: true,
      movies: movies,
    });
  } catch (error) {
    response
      .status(400)
      .json({ message: Messages.movieNotFound, success: false });
  }
};

const createMovies = async (request, response) => {
  try {
    const { movie } = request.body;

    const director = await Director.findById(movie.directors);

    movie.directors = director;

    const movieData = new Movie(movie);

    director.movies.push(movieData._id);

    const queries = [movieData.save(), director.save()];

    await Promise.all(queries);

    const movieResult = await Movie.findById(movieData._id)
      .select(["title", "rating", "genre", "releaseDate", "directors"])
      .populate({
        path: "directors",
        select: ["name", "birthDate", "moviesDirected", "retired"],
      });

    response.status(200).json({
      message: `${request.method} ${Messages.successfulMovieMessage}`,
      success: true,
      data: movieResult,
    });
  } catch (error) {
    response.status(400).json({ message: Messages.badRequest, success: false });
  }
};

const updateMovies = async (request, response) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .select(["title", "rating", "genre", "releaseDate", "directors"])
      .populate({
        path: "directors",
        select: ["name", "birthDate", "moviesDirected", "retired"],
      });

    if (!movie) {
      return response
        .status(404)
        .json({ message: Messages.movieNotFound, success: false });
    }

    response.status(200).json({
      message: `${request.method} ${Messages.successfulMovieMessage}`,
      success: true,
      movie: movie,
    });
  } catch (error) {
    response.status(400).json({ message: error.message, success: false });
  }
};

const deleteMovies = async (request, response) => {
  try {
    const deleted = await Movie.findByIdAndDelete(request.params.id);
    if (!deleted) {
      return response
        .status(404)
        .json({ message: Messages.movieNotFound, success: false });
    }
    return response.status(200).json({
      message: `${request.method} ${Messages.successfulMovieMessage}`,
      success: true,
    });
  } catch (error) {
    response
      .status(400)
      .json({ message: Messages.movieNotFound, success: false });
  }
};

module.exports = {
  getAllMovies,
  getMoviesbyId,
  getMoviesByDirectorId,
  updateMovies,
  deleteMovies,
  createMovies,
};
