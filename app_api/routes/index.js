const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens

// this is where we import the controllers we will route
const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");

// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
    console.log('In middleware'); // comment out to remove console log
    
    const authHeader = req.headers['authorization'];
    console.log('Auth Header: ' + authHeader);  // comment out to remove console log

    if(authHeader == null)
    {
        console.log('Not enough tokens in Auth Header: ' + headers.length);
        return res.sendStatus(501);
    }

    const token = authHeader.split(' ')[1];
    console.log('Token: ' + token); // comment out to remove console log

    if(token == null)
    {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }

    // console.log(process.env.JWT_SECRET);
    // console.log(jwt.decode(token));
    const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if(err)
        {
            return res.sendStatus(401).json('Token Validation Error!');
        }
        req.auth = verified; // Set the auth param to the decoded object
    });
    next(); // we need to continue or this will habg forever
}

// route for register endpoint
router.route("/register").post(authController.register);

// Define Route for Login endpoint
router
    router.route("/login")
    .post(authController.login);

// define routes for our trips endpoint
router
    .route("/trips")
    .get(tripsController.tripsList) // GET method routes triplist
    //.post(tripsController.tripsAddTrip); // POST method adds a trip
    .post(authenticateJWT, tripsController.tripsAddTrip); // new post method for adding trip when authenticated

// GET method routes tripsFindByCode
// PUT method routes tripsUpdateTrip
// DELETE method routes tripsDeleteTrip
router
    .route("/trips/:tripcode")
    .get(tripsController.tripsFindByCode)
    .put(authenticateJWT, tripsController.tripsUpdateTrip) // updated to add authentication
    .delete(authenticateJWT, tripsController.tripsDeleteTrip); // updated to add authentication

module.exports = router;
