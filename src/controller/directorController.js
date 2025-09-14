const Director = require("../models/Director");
const Messages = require("../models/Messages");
const getAllDirectors = async (request, response) => {
  try {
    const director = await Director.find({});
    // .select([
    //   "name",
    //   "birthDate",
    //   "moviesDirected",
    //   "retired",
    // ]);
    response.status(200).json({
      message: `${request.method} ${Messages.successfulDirectorMessage}`,
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
    // .select([
    //   "name",
    //   "birthDate",
    //   "moviesDirected",
    //   "retired",
    // ]);
    // TO DO: Figure out if need to validate length of ID before calling FindById
    if (director == null) {
      response.status(200).json({
        message: `${request.method} ${Messages.notFound}`,
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
    const director = await Director.create(request.body);
    // .select([
    //   //TODO: fix this :)
    //   "name",
    //   "birthDate",
    //   "moviesDirected",
    //   "retired",
    // ]);
    response.status(200).json({
      message: `${request.method} ${Messages.successfulDirectorMessage}`,
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
    // .select(["name", "birthDate", "moviesDirected", "retired"]);
    // response.status(200).json({
    //   message: `${request.method} ${Messages.successfulDirectorMessage}`,
    //   success: true,
    //   director: director,
    // });
  } catch (error) {
    response.status(400).json({ message: error.message, success: false });
  }
};

const deleteDirectors = async (request, response) => {
  try {
    await Director.findByIdAndDelete(request.params.id);
    response.status(200).json({
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
