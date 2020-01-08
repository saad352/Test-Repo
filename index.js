
var express = require('express');
var path = require('path');

var app = express();

// app.engine('html', require('ejs'.renderFile));
app.set("view engine", "ejs");
// app.set("views", __dirname + "public"); 

// Serve static assets from the /public folder
// app.use('/public', express.static(path.join(__dirname, '/public')));

var port = process.env.PORT || 1347;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('wout-server running on port ' + port + '.');
    console.log(__dirname);
});

app.get('/', function(req, res) {
  res.status(200).send('I am website NOW on port 80');
});

var addGym = require('./routes/addGyms');
app.use('/addGym',addGym);

app.get('/gymLocations', function(req, res) {

		console.log("gymCalled");


	  const https = require('https');
	  const options = {
	    hostname: 'murmuring-lowlands-82910.herokuapp.com',
	    port: 443,
	    path: '/parse/classes/GymLocations',
	    method: 'GET',
	    headers: {
	      "X-Parse-REST-API-Key" : "undefined",
	      "X-Parse-Application-Id" : ""
	    }
	  };

	  const request = https.request(options);
	  var json;

	  request.on('response', function (response) {
	    console.log('STATUS: ' + response.statusCode);
	    console.log('HEADERS: ' + JSON.stringify(response.headers));
	    response.setEncoding('utf8');
	    response.on('data', function (chunk) {
	      console.log('BODY: ' + chunk);
	      json = JSON.parse(chunk);
	      var resultArr = json["results"];
	      var gymArr = [];
	      console.log(resultArr);
	      resultArr.forEach(gym=> {
	      	gymArr.push(gym);
	      	console.log("Gym Name: " + gym["gymname"])
	      });


	      
	      res.render('gymLocation', {page:'Home Gym', menuId:'home', data: {searchResults : gymArr }});
	      });
	  });

	  request.end();

  	
});



