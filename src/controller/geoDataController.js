// Import GeoData schema model for lat, long, city, country, temp
const GeoData = require("../models/GeoData");

// import Messages file for error and success messages
const Messages = require("../models/GeoMessages");

// controller function for GET requests
const getAllGeoData = async (request, response) => {
  try {
    // query parameters from url eg. request.query
    const { from, to, lat, lng } = request.query;

    // If thers is a lattitdue and longitude call API and return the parsed properties
    if (lat && lng) {
      const apiKey = process.env.OWM_API_KEY;

      // No API Key = Error message
      if (!apiKey) {
        return response
          .status(500)
          .json({ message: "Missing OWM_API_KEY", success: false });
      }
      // fetch and build OWM url for filedsa using temp strings
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`;

      // Make HTTP request to the OWM API
      const resp = await fetch(url);

      // If request/response fails return API error message
      if (!resp.ok) {
        return response
          .status(resp.status)
          .json({ message: Messages.apiError, success: false });
      }

      // Convert response into JSON
      const data = await resp.json();

      // Only include these fileds from the the OWM API
      const parsed = {
        lat: data.coord.lat,
        lng: data.coord.lon,
        city: data.name,
        country: data.sys.country,
        temp: data.main.temp,
      };
      // returns success message if response goes through and fetches data returning the parsed fields
      return response.status(200).json({
        message: `${request.method} ${Messages.successfulGeoMessage}`,
        success: true,
        parsed,
      });
    }

    // start filter with an empty query objecgt to add date filters
    const filter = {};

    // If theres is a from and to start a createdat range filter
    // $gte = greater than or equal to
    // $lte = less than or equal to
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }

    console.log("Test");
    // Ask mongo for only the selected fields and pass filter through for dates/created at
    const docs = await GeoData.find(filter)
      .select([
        "lat",
        "lng",
        "city",
        "country",
        "temp",
        "createdAt",
        "updatedAt",
      ])
      // Start at decending order
      .sort({ createdAt: -1 });

    // return a success message with list of fields
    return response.status(200).json({
      message: `${request.method} ${Messages.successfulGeoMessage}`,
      success: true,
      data: docs,
    });
  } catch (error) {
    // return an error response and message
    return response
      .status(400)
      .json({ message: error.message, success: false });
  }
};

// Look up data by specific Mongo ID
const getGeoDataById = async (request, response) => {
  try {
    // Request parameters for IDs on only selected fields
    const doc = await GeoData.findById(request.params.id).select([
      "lat",
      "lng",
      "city",
      "country",
      "temp",
      "createdAt",
      "updatedAt",
    ]);

    // If there are no fileds return a fail or not found message
    if (!doc) {
      return response
        .status(404)
        .json({ message: Messages.geoNotFound, success: false });
    }

    // Or return sucess message returning all fields
    return response.status(200).json({
      message: `${request.method} ${Messages.successfulGeoMessage}`,
      success: true,
      data: doc,
    });
  } catch (error) {
    return response
      .status(400)
      .json({ message: Messages.geoNotFound, success: false });
  }
};

// POST controller to create data in body
const createGeoData = async (request, response) => {
  try {
    // geo sends in body when creating/POST
    const { geo } = request.body;

    // if the request body's lattitude and longitude entered aren't numbers then return error message bad request
    if (!geo || typeof geo.lat !== "number" || typeof geo.lng !== "number") {
      return response
        .status(400)
        .json({ message: Messages.badRequest, success: false });
    }

    // Build new Mongo data in body with fields from GeoData model schema. eg request.body.lat etc
    const doc = await GeoData.create({
      lat: geo.lat,
      lng: geo.lng,
      city: geo.city,
      country: geo.country,
      temp: geo.temp,
    });

    // Return the created/Saved ID eg doc._id
    return response.status(201).json({
      message: `${request.method} ${Messages.successfulGeoMessage}`,
      success: true,
      id: doc._id,
    });
  } catch (error) {
    return response
      .status(400)
      .json({ message: Messages.badRequest, success: false });
  }
};

// PUT controller for updating
const updateGeoData = async (request, response) => {
  try {
    // finds ID from body and updates
    const geo = await GeoData.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        // new = return the updated content
        new: true,
        // include all schema props in body when updating
        runValidators: true,
      }
    ).select([
      "lat",
      "lng",
      "city",
      "country",
      "temp",
      "createdAt",
      "updatedAt",
    ]);

    // If there isnt a valid id in the body return a fail message
    if (!geo) {
      return response
        .status(404)
        .json({ message: Messages.geoNotFound, success: false });
    }

    return response.status(200).json({
      message: `${request.method} ${Messages.successfulGeoMessage}`,
      success: true,
      data: geo,
    });
  } catch (error) {
    return response
      .status(400)
      .json({ message: error.message, success: false });
  }
};

// DELETE Controller
const deleteGeoData = async (request, response) => {
  try {
    // Finds and removes the data by ID
    const deleted = await GeoData.findByIdAndDelete(request.params.id);

    // If there isnt an ID matching the delete then return not found
    if (!deleted) {
      return response
        .status(404)
        .json({ message: Messages.geoNotFound, success: false });
    }
    return response.status(200).json({
      message: `${request.method} ${Messages.successfulGeoMessage}`,
      success: true,
    });
  } catch (error) {
    return response
      .status(400)
      .json({ message: Messages.geoNotFound, success: false });
  }
};

// Export all functions for routes
module.exports = {
  getAllGeoData,
  getGeoDataById,
  updateGeoData,
  deleteGeoData,
  createGeoData,
};
