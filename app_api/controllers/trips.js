const mongoose = require('mongoose');
const Trip = require('../models/travlr');  // Register model 
const Model = mongoose.model('trips');  

// GET: /trips - lists all the trips
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({})  // no filter, return all records
        .exec();

        // Uncomment the following line to show results of query on the console
        // console.log(q);

    if (!q) 
        { // database returned no data
            return res
                .status(404)
                .json(err);

        } else { //  return resulting trip list
            return res
                .status(200)
                .json(q);
        }

};

// GET: /trips/:tripcode - lists a single trip
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripcode})  // return single record 
        .exec();

        // uncomment the following line to show results of query on the console
        // console.log(q);

        if (!q)
        { // database returned no data
            return res
                .status(404)
                .json(err);

        } else { //  return resulting trip list
            return res
                .status(200)
                .json(q);
        }

};

module.exports = {
    tripsList,
    tripsFindByCode
};
