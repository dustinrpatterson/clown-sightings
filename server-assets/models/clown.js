let DataStore = require('nedb');
let db = new DataStore({
    filename: './data/clowns.db',
    autoload: true
});

function Clown(name, hair, shoeSize, weapon, psycho) {
    this.name = name;
    this.hair = hair;
    this.shoeSize = shoeSize;
    this.weapon = weapon;
    this.psycho = psycho || true;
    this.dead = false;
    this.sightings = []
}

function findClown(id, cb) {
    db.findOne({_id: id}, cb);    
};

function addClown(clown, cb) {
    let newClown = new Clown(clown.name, clown.hair, clown.shoeSize, clown.weapon, clown.psycho);
    db.insert(newClown, function(err, newClown){
        if(err){
            return cb(err);
        }
    return cb(null, {message: "Clown added."});
    })
}

function getClowns(cb) {
    db.find({}, cb)
}

function killClown(id, cb) {
    db.update({_id: id}, {$set: {dead:true} }, {}, cb)
};

function editClown(id, newClown, cb) {
    db.update({_id: id}, {$set: {
        name: newClown.name,
        hair: newClown.hair,
        shoeSize: newClown.shoeSize,
        weapon: newClown.weapon,
        psycho: newClown.psycho
    }}, {}, cb)
}

module.exports = {
    addClown,
    getClowns,
    killClown,
    editClown,
    getClown: findClown
}