// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

//var req = require('request');

var API_KEY = 'AIzaSyBG5wSjljgM7qNPmsTLtKptf36Cz2WvtwU';
var CX = '007483715269021992219:tsmgvdhde94';

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/imagesearch/:query", function (request, response) {
  debugger;
  var keyword = request.params["query"];
  var offset = request.query.offset;
  var apiUrl = 'https://www.googleapis.com/customsearch/v1?key=' + API_KEY + '&cx=' + CX + '&q=' + keyword + '&searchType=image' + '&fields=items(link,snippet,image/thumbnailLink,image/contextLink)';
  response.end(apiUrl);
  //response.end("test test")
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});