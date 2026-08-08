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

// POST: /trips - adds a new Trip
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

    if (!q)
    { // database returned no data
        return res
            .status(404)
            .json(err);
    } else { //  return new trip
        return res
            .status(201)
            .json(q);
    }

    // uncomment the following line to show results of query on the console
    // console.log(q);

};

// PUT: /trips/:tripcode - Adds a new Trip
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client

const tripsUpdateTrip = async(req, res) => {

    // uncomment for debugging
    console.log(req.params);
    console.log(req.body);

    const q = await Model
        .findOneAndUpdate(
            { 'code': req.params.tripcode },  // filter
            { 
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
        .exec();

    if (!q) {
        // database returned no data
        return res
            .status(400)
            .json(err);
    } else {
        //  return updated trip
        return res
            .status(201)
            .json(q);
    }

    // uncomment the following line to show results of the operation on the console
    // console.log(q);
};

// DELETE: /trips/:tripCode - deletes a trip
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client

const tripsDeleteTrip = async(req, res) => {

    // uncomment for debugging
    console.log(req.params);
    console.log(req.body);

    const q = await Model
        .findOneAndDelete(
            { code: req.params.tripcode }
        )
        .exec();

    if (!q) {
        // database returned no data
        return res
            .status(400)
            .json(err);
    } else {
        //  return updated trip
        return res
            .status(200)
            .json(q);
    }

    // uncomment the following line to show results of the operation on the console
    // console.log(q);
};        

        
module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};
