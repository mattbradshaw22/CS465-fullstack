const express = require("express");
const router = express.Router();

// this is where we import the controllers we will route
const tripsController = require("../controllers/trips");

// define route for our trips endpoint
router
    .route("/trips")
    .get(tripsController.tripsList) // GET method routes triplist

// GET method routes tripsFindByCode
router
    .route("/trips/:tripcode")
    .get(tripsController.tripsFindByCode);

module.exports = router;
