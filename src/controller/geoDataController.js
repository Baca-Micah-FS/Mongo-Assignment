const GeoData = require("../models/GeoData");
const Messages = require("../models/GeoMessages");

const getAllGeoData = async (request, response) => {
  try {
    const { from, to, lat, lng } = request.query;

    if (lat && lng) {
      const apiKey = process.env.OWM_API_KEY;
      if (!apiKey) {
        return response
          .status(500)
          .json({ message: "Missing OWM_API_KEY", success: false });
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`;
      const resp = await fetch(url);
      if (!resp.ok) {
        return response
          .status(resp.status)
          .json({ message: Messages.apiError, success: false });
      }
      const data = await resp.json();

      const parsed = {
        lat: data.coord.lat,
        lng: data.coord.lon,
        city: data.name,
        country: data.sys.country,
        temp: data.main.temp,
      };

      return response.status(200).json({
        message: `${request.method} ${Messages.successfulGeoMessage}`,
        success: true,
        parsed,
      });
    }

    const filter = {};
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }

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
      .sort({ createdAt: -1 });

    return response.status(200).json({
      message: `${request.method} ${Messages.successfulGeoMessage}`,
      success: true,
      count: docs.length,
      data: docs,
    });
  } catch (error) {
    return response
      .status(400)
      .json({ message: error.message, success: false });
  }
};

const getGeoDataById = async (request, response) => {
  try {
    const doc = await GeoData.findById(request.params.id).select([
      "lat",
      "lng",
      "city",
      "country",
      "temp",
      "createdAt",
      "updatedAt",
    ]);

    if (!doc) {
      return response
        .status(404)
        .json({ message: Messages.geoNotFound, success: false });
    }

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

const createGeoData = async (request, response) => {
  try {
    const { geo } = request.body;

    if (!geo || typeof geo.lat !== "number" || typeof geo.lng !== "number") {
      return response
        .status(400)
        .json({ message: Messages.badRequest, success: false });
    }

    const doc = await GeoData.create({
      lat: geo.lat,
      lng: geo.lng,
      city: geo.city,
      country: geo.country,
      temp: geo.temp,
    });

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

const updateGeoData = async (request, response) => {
  try {
    const geo = await GeoData.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
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

const deleteGeoData = async (request, response) => {
  try {
    const deleted = await GeoData.findByIdAndDelete(request.params.id);
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

module.exports = {
  getAllGeoData,
  getGeoDataById,
  updateGeoData,
  deleteGeoData,
  createGeoData,
};
