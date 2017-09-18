// console.log("Please enter an area code to get weather information about that area.");
// var prompt = require('prompt');
// console.log(Math.floor(Date.now / 3600));
// var someTime = parseInt(Date.now);
// // console.log(someTime);
// console.log(getTime);

console.log(Date.now())
// // date = Date.now;  
// var time = Date.now()
// // console.log(date)
// console.log(time)
// console.log(time - day)

// Sets up an interface for us to read a line and gather user input
const readline = require('readline');

const zip = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Asks the user to ebnter a zip code,
//. then sends their response to a function to make a web request, 
//. which calls another function to create a url using the zip as a param
zip.question('Please enter a 5 digit zip code containing only numbers ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`You've enetered a zip code of: ${answer}`);
  makeGeoRequest(answer)
  zip.close();
});

// function that takes in zip code information and makes a request URL for googles geocode API
// to gather lat and lng information about that area. Sends that url to 
// a function to make the request
var makeGeoReqURL = function(zip){
	return "https://maps.googleapis.com/maps/api/geocode/json?address=" + zip + "&key=AIzaSyBZqs-MS-5WyI9s-eS2Bx3wEemC5gzlhqc";
}

// Takes in a url made from the makeGeoReqURL function and makes a web request to that location
//  then parses the response into a JSON object and send the information returned
//  to a function which can extract the lat and lng information from the response
var makeGeoRequest = function(zip){
	var request = require("request");
	var geoInfo = request(makeGeoReqURL(zip), function(error, response, body) {
	getLatLng(JSON.parse(body));
	});
}

// Takes in a latitude and longitude to make a URL to request from 
// the dark sky weather api
var makeWeatherRequestNowURL = function(lat, lng){
	var keyDS = "bdff756c7b33041b10dcef1de7bf1fff/"
	var exclude = "?exclude=currently,minutely,alerts,flags"

	return "https://api.darksky.net/forecast/" + keyDS + lat + "," + lng 
	// + "," + exclude
// + (Date.now / 1000) 
}

var makeWeatherRequestNow = function(lat, lng){

	var request = require("request");
	var geoInfo = request(makeWeatherRequestNowURL(lat, lng), function(error, response, body) {
	console.log(JSON.parse(body));
	});
}

// Takes in a latitude and longitude to make a URL to request from 
// the dark sky weather api
var makeWeatherRequestThenURL = function(lat, lng){
	var keyDS = "bdff756c7b33041b10dcef1de7bf1fff/"
	var exclude = "?exclude=currently,minutely,alerts,flags"
    // var yesterday  =(Date.now.to_i.fdiv(3600).round) * 3600
	return "https://api.darksky.net/forecast/" + keyDS + lat + "," + lng + (Date.now() - 86400000) + exclude
	// + "," + exclude
// + (Date.now / 1000) 
}

var getTimeYesterday = function(){
	Math.floor(Date.now() / 3600);
}
var makeWeatherRequestThen = function(lat, lng){
	var request = require("request");
	var geoInfo = request(makeWeatherRequestThenURL(lat, lng, getTime), function(error, response, body) {
	console.log(JSON.parse(body));
	});
}

var getLatLng = function(geoInfo){
	var lat = geoInfo["results"][0]["geometry"]["location"]["lat"];
	var lng = geoInfo["results"][0]["geometry"]["location"]["lng"];
	console.log(typeof lat);
	console.log(typeof lng);

	var weatherNow = makeWeatherRequestNow(lat, lng);
	var weatherThen = makeWeatherRequestThen(lat, lng);
}

var getTemps = function(then, now){
	var tempThen = then;
	var tempNow = now;
}

var getTime = function(){
	var minute = 1000 * 60;  
	var hour = minute * 60;
	var day = hour * 24;  
	var time = Date.now()
	
	return time - day;
}
// console.log(zipCode);
// Properties to make a request for the user to enter zip code information 
// var properties = {
//   name: 'zip', 
//   validator: /^[0-9]+$/,
//   warning: 'Postal code must be only 5 numbers'
// }

// // Makes the request for the user, and checks to make sure the input is valid
// // If the input is valid, it passes the zip code to a function to gather lat and lng information
// prompt.start()
// var zip = prompt.get(properties, function (err, result) {
// 	if (err) { return onErr(err); }
// 		console.log('Command-line input received:');
// 		console.log('  zip: ' + result.zip);
// 		debugger;

// 		return result.zip
// 		// makeRequest(makeGeoReqURL(result.zip));
// });

// function onErr(err) {
// 	console.log(err);
// 	return 1;
// }


// makeRequest;
// function that takes in zip code information and makes a request URL for googles geocode API
// to gather lat and lng information about that area. Sends that url to 
// a function to make the request
// var makeGeoReqURL = function(zip){
// 	return "/maps/api/geocode/json?address=" + zip + "&key=AIzaSyBZqs-MS-5WyI9s-eS2Bx3wEemC5gzlhqc";
// 	// return "/maps/api/geocode/json?address=" + zip + "&key=AIzaSyBZqs-MS-5WyI9s-eS2Bx3wEemC5gzlhqc";
// }
// // "https://maps.googleapis.com/maps/api/geocode/json?address=68154&key=AIzaSyBZqs-MS-5WyI9s-eS2Bx3wEemC5gzlhqc"

// var request = require("request");

// var makeReq = request(makeGeoReqURL(zipCode), function(error, response, body) {
//   console.log(body);
// });
// var makeRequest = function(){
// 	var http = require('http');

// 	//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
// 	var options = {
// 	  host: 'https://maps.googleapis.com',
// 	  path: "/maps/api/geocode/json?address=68154&key=AIzaSyBZqs-MS-5WyI9s-eS2Bx3wEemC5gzlhqc"
// 	};

// 	callback = function(response) {
// 	  var str = '';

// 	  //another chunk of data has been recieved, so append it to `str`
// 	  response.on('data', function (chunk) {
// 	    str += chunk;
// 	  });

// 	  //the whole response has been recieved, so we just print it out here
// 	  response.on('end', function () {
// 	    console.log(str);
// 	  });
// 	}

// 	http.request(options, callback).end();
// }

// Takes in a url and makes a web request to googles geocode API
// var makeGeoRequest = function(url){
// 	var request = new XMLHttpRequest();
// 		request.open("GET", url);
// 		request.send();
// 		request.addEventListener("load", function(event){
// 			getLatLng(JSON.parse(event.target.response));
// 		});
// }

// var makeRequest = function(url){
// new Ajax.Request( url, {
//   method:  'get',
//   onSuccess:  function(response){
//     console.log(response.responseText);
//   },
//   onFailure:  function(){
//     console.log('ERROR');
//   }
// });
// }


// function httpGet(url){
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.open( "GET", url); // false for synchronous request
//     xmlHttp.send( );
//     return xmlHttp.responseText;
// }

// Takes in a rezponse from google geoCode api and extracts lat and lng information 
// var getLatLng = function(geoInfo){
// 	var lat = string(geoInfo["results"][0]["geometry"]["location"]["lat"]);
// 	var lng = string(geoInfo["results"][0]["geometry"]["location"]["lng"]);

// 	console.log (lat + lng);
// }
// 	var response = Net::HTTP.get(uri)
// 	geoInfo = JSON.parse(response)

// 	lat = geoInfo["results"][0]["geometry"]["location"]["lat"].to_s
// 	lng = geoInfo["results"][0]["geometry"]["location"]["lng"].to_s

// 	timeToCompare = (Time.now.to_i.fdiv(3600).round) * 3600

// 	yesterdaysTemp = getWeatherThen(lat, lng, timeToCompare)
// 	todaysTemp = getWeatherNow(lat, lng, timeToCompare)

// 	temps = [yesterdaysTemp,todaysTemp]
// 	return temps
// end
