const Director = require("../models/Director");

const getAllDirectors = async (request, response) => {
  try {
    const director = await Director.find({});
    response.status(200).json({
      message: `${request.method} verb to the Director controller`,
      director: director,
      sucess: true,
    });
  } catch (error) {
    response.status(400).json({ message: error.message, success: false });
  }
};

const getDirectorsbyId = async (request, response) => {
  try {
    const director = await Director.findById(request.params.id);
    response.status(200).json({
      message: `${request.method} Get Directors by ID`,
      director: director,
      success: true,
    });
  } catch (error) {
    response.status(400).json({ message: error.message, success: false });
  }
};

const createDirectors = async (request, response) => {
  try {
    const director = await Director.create(request.body);
    response.status(200).json({
      message: `${request.method} Create Director`,
      success: true,
      director: director,
    });
  } catch (error) {
    response.status(400).json({ message: error.message, success: false });
  }
};

const updateDirectors = async (request, response) => {
  try {
    const director = await Director.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
      }
    );
    response.status(200).json({
      message: `${request.method} Update Directors`,
      success: true,
      director: director,
    });
  } catch (error) {
    response.status(400).json({ message: error.message, success: false });
  }
};

const deleteDirectors = async (request, response) => {
  try {
    await Director.findByIdAndDelete(request.params.id);
    response
      .status(200)
      .json({ message: `${request.method} Delete Director`, success: true });
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
