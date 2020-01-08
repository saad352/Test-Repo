const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json( ));

router.get('/',function(req,res,next) {
	res.render('addGym',{ page:'Add Gym' });
});

router.post('/',function(req,res,next) {
	console.log(req.body["gymName"]);
	console.log(req.body["gymLocationLat"]);
	console.log(req.body["gymLocationLng"]);

	const schema = Joi.object().keys({
		gymName : Joi.string().trim().required().label('Gym Name'),
		gymLocationLat : Joi.number().required().label('Gym Location Latitude'),
		gymLocationLng : Joi.number().required().label('Gym Location Longitude')
	}); 

	Joi.validate(req.body, schema, (err, result)=> {
		if(err) {
			var errStr="";
			let errorDetails = err["details"];
			errorDetails.forEach(obj=> {
				errStr += obj["message"];
			});
			res.send(errStr);
			console.log(err);
			return;
		}else
			console.log(result);
	});






	const https = require('https');

	const data = JSON.stringify({
  		"gymname"	: req.body["gymName"],
  		"geolocation": {
			"__type": "GeoPoint",
			"latitude": Number(req.body["gymLocationLat"]),
	    	"longitude": Number(req.body["gymLocationLng"])
    	}
	});

	  const options = {
	    hostname: 'murmuring-lowlands-82910.herokuapp.com',
	    port: 443,
	    path: '/parse/classes/GymLocations',
	    method: 'POST',
	    headers: {
	      "X-Parse-REST-API-Key" : "undefined",
	      "X-Parse-Application-Id" : "s8Qc2f9jmVU0DqnKykh0s7pgEo1PylfUr6yXDnsJ",
	      "Content-Type" : "application/json",
    	  "Content-Length" : data.length
	    }
	  };
	  // cW4Nh1f5Vl

	  const request = https.request(options);
	  var json;

	  request.on('response', function (response) {
	    console.log('STATUS: ' + response.statusCode);
	    console.log('HEADERS: ' + JSON.stringify(response.headers));
	    response.setEncoding('utf8');
	    response.on('data', function (chunk) {
	      console.log('BODY: ' + chunk);

	      // json = JSON.parse(chunk);
	      // var resultArr = json["results"];
	      // var gymArr = [];
	      // console.log(resultArr);
	      // resultArr.forEach(gym=> {
	      // 	gymArr.push(gym);
	      // 	console.log("Gym Name: " + gym["gymname"])
	      // });


	      
			res.send("SuccessFully added Gym");
	      // res.render('gymLocation', {page:'Home Gym', menuId:'home', data: {searchResults : gymArr }});
	      });
	  });

	  request.write(data);
	  request.end();




});


function postData (gymObj) {

}


module.exports = router;
