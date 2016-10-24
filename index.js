let express = require("express");
let bodyParser = require("body-parser");
//When I copied the path, it reversed the slashes in the file path
let Clown = require("./server-assets/routes/clown-routes");
let Sighting = require("./server-assets/routes/sighting-routes");
let server = express();

server.use(express.static(__dirname + "/public"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(Clown.routes)
server.use(Sighting.routes)


server.listen(8080,function(){
    console.log({message: "Your server for clowns is up and running!"})
})