// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var GoogleSearch = require('google-search');

var CX = '007483715269021992219:tsmgvdhde94';
var API_KEY = 'AIzaSyBG5wSjljgM7qNPmsTLtKptf36Cz2WvtwU';



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
  
  customsearch.cse.list({
  cx: CX,
  q: keyword,
  auth: API_KEY
}, (err, res) => {
  if (err) {
    throw err;
  }
  console.log(JSON.stringify(res.searchInformation));
});

  response.send(keyword + " " + offset);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
