const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register Model
const Model = mongoose.model('trips');

//GET: /trips - lists all trips
const tripList = async (req, res) => {
    const q = await Model
        .find({}) // no filter, return all records
        .exec();

    if(!q)
    { //database returned no data
        return res
            .status(404)
            .json({ message: "No trips found" });
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

//GET: /trips/:tripCode - finds trip by code
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode }) // Return single record
        .exec();

    if(!q)
    { //database returned no data
        return res
            .status(404)
            .json({ message: "Trip not found" });
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

//POST: /trips - Adds a new trip
const tripsAddTrip = async (req, res) => {
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
    
    if(!q)
    { //database returned no data
        return res
            .status(404)
            .json({ message: "Failed to save trip" });
    } else { // Return new trip
        return res
            .status(201)
            .json(q);
    }
};

//PUT: /trips/:tripCode - Updates a trip
const tripsUpdateTrip = async (req, res) => {
  console.log(req.params);
  console.log(req.body);

  const q = await Model
    .findOneAndUpdate(
        { 'code': req.params.tripCode },
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

    if (!q) 
    { // Database returned no data
        return res
        .status(400)
        .json({ message: "Trip not found to update" });
    } else { // Return resulting updated trip
        return res
            .status(201)
            .json(q);
    }
};

module.exports = {
    tripList,
    tripsAddTrip,
    tripsFindByCode,
    tripsUpdateTrip
};
