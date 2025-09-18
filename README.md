# GeoSpatial API Assignment

Fetch current weather data by lattitude and longitude and parse that data.

Create a storage of the data by ID

filter data range createdAt updatedAt

GET PUT POST and GET by ID for stored data in database

### Dependencies

mongoDB, Express, and Node

Mongo running on port 27017

```bash
npm install
```

### Application run commands

## Start

```bash
npm run start
```

## Run

```bash
npm run dev
```

### API Docs

https://openweathermap.org/api

### Routes

GeoDataRoutes:

GET ALL BY ID
router.get("/:id", getGeoDataById);

GET ALL
router.get("/", getAllGeoData);

POST/CREATE
router.post("/", createGeoData);

PUT/EDIT
router.put("/:id", updateGeoData);

DELETE
router.delete("/:id", deleteGeoData);
