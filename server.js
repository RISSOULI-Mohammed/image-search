// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

//var req = require('request');
var https = require('https');

//google key
//var API_KEY = 'AIzaSyBG5wSjljgM7qNPmsTLtKptf36Cz2WvtwU';
//var CX = '007483715269021992219:tsmgvdhde94';

//bing key
var API_KEY = '0dda7c9705ab4d719af6483232ee92a3';

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/imagesearch/:query", function (request, response) {
  //debugger;
  var keyword = request.params["query"];
  var offset = request.query.offset;
  //var apiUrl = 'https://www.googleapis.com/customsearch/v1?key=' + API_KEY + '&cx=' + CX + '&q=' + keyword + '&searchType=image' + '&fields=items(link,snippet,image/thumbnailLink,image/contextLink)';
  //var apiUrl = 'https://www.googleapis.com/customsearch/v1?key=' + API_KEY + '&cx=' + keyword + '&searchType=image' + '&fields=items(link,snippet,image/thumbnailLink,image/contextLink)';
  
  var request_params = {
        method : 'GET',
        hostname : 'api.cognitive.microsoft.com',
        path : '/bing/v7.0/images?q=' + encodeURIComponent(keyword),
        headers : {
            'Ocp-Apim-Subscription-Key' : API_KEY,
        }
    };
  
  var req = https.request(request_params, function(resp){
  var body = '';
    response.on('data', function (d) {
        body += d;
    });
    response.on('end', function () {
        body = JSON.stringify(JSON.parse(body), null, '  ');
        console.log('\nJSON Response:\n');
        console.log(body);
    });
  });
  req.end();
  
  //req(apiUrl, function (err, resp, body) {
  //  if (!err && resp.statusCode == 200) {
  //    var outPutJson = JSON.parse(body);
  //    response.send(resp);
  //  }
  //});
  //response.end("test test")
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});