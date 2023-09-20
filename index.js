// Setup basic express server
var debug = true;

var port = debug ? 7777 : 27016;

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');

server.listen(7777, function () {
    console.log('Server listening at port %d', port);
});
// Routing
app.use(express.static(__dirname + '/public'));


io.on('connection', function (socket) {
  
    console.log('User Connected');

    socket.on("getRecipes", function(boxNum) {
        var recipeNames = [];
        fs.readFile('recipes.json', function (err, d) {
            if (err) {
              socket.emit("e", err);
              throw err;
            }
            
            var data = JSON.parse(d);
            for(var i = 0; i < data.recipes.length; i++) {
                console.log(data.recipes[i].name);
                recipeNames.push(data.recipes[i].name);
                console.log(recipeNames);
            }
            socket.emit("recieveRecipes", recipeNames, boxNum);
        });
    });
    
});