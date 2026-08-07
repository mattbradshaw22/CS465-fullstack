const express = require("express");
const router = express.Router();

// this is where we import the controllers we will route
const tripsController = require("../controllers/trips");

// define routes for our trips endpoint
router
    .route("/trips")
    .get(tripsController.tripsList) // GET method routes triplist
    .post(tripsController.tripsAddTrip); // POST method adds a trip

// GET method routes tripsFindByCode
// PUT method routes tripsUpdateTrip
router
    .route("/trips/:tripcode")
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);

module.exports = router;
