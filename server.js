// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "3f11af9dc39e75e0951ab8119acb7e93",
      secret: "62f5a82074f074cf"
    };
 

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/api/imagesearch/:query", function (request, response) {
  var keyword = request.params["query"];
  var offset = request.query.offset;
  Flickr.authenticate(flickrOptions, function(error, flickr) {
  flickr.photos.search({
  user_id: flickr.options.user_id,
  page: 1,
  per_page: 50,
  text: keyword
}, function(err, result) {
  // result is Flickr's response
});
});

  response.send(keyword + " " + offset);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
