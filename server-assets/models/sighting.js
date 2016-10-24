let DataStore = require('nedb');
let db = new DataStore({
    filename: './data/sightings.db',
    autoload: true
});
let moment = require("moment");
let today = new Date();
let Clown = require('./clown');


function Sighting(clownID, location, spotter, time, date) {
    // How am I getting clownID???
    this.clownID = sighting.clownID;
    this.location = sighting.location;
    this.spotter = sighting.spotter;
    this.time = time || moment(today).format("h:mm:ss a")
    this.date = date || moment(today).format("MMM Do YY");
    this.removed = false;
}

function findSighting(id, cb) {
    db.findOne({_id: id}, cb);    
};


//Jakes addSighting
function jakesAddSighting(sighting, cb){
    Clown.getClown(sighting.clownID, function (err, clown){}
        if(!clown || err){
            return cb ({error:err, message: 'Sorry. That did not work.'})
        }
        let newSighting = new Sighting(sighting)
        db.insert(newSighting, function (err, savedSighting){
            if(err) {return cb(err)}
            clown.sightings.push(savedSighting._id)
            return cb(null, {message: "You're lucky to be alive after seeing " + clown.name + " the clown!"})
        })

    })
}
//End of Jakes

// function addSighting(sighting, cb) {
//     let newSighting = new Sighting(sighting.clownID, sighting.location, sighting.spotter, sighting.time, sighting.date);
//     db.insert(newSighting, function(err, newSighting){
//         if(err){
//             return cb(err);
//         }
//     return cb(null, {message: "Thank you for reporting a sighting"});
//     })
// }

function getSightings(cb) {
    db.find({}, cb)
}

function removeSighting(id, cb) {
    db.update({_id: id}, {$set: {removed:true} }, {}, cb)
};

function editSighting(id, newSighting, cb) {
    db.update({_id: id}, {$set: {
        // Need  the clown ID here too...
       clownID: newSighting.clownID,
       location: newSighting.location,
       spotter: newSighting.spotter,
       time: newSighting.time,
       date: newSighting.date
    }}, {}, cb)
}

module.exports = {
    addSighting,
    getSightings,
    removeSighting,
    editSighting,
    getSighting: findSighting
}