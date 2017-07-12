//require the filesystem package for node have the ability to read from and write to other files
//require twitter and spotify modules
//require request module

var fs = require("fs");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");

//grab keys from keys.js and save it in a variable

var keys = require("./keys.js");

var client = new twitter (
	keys.twitterKeys
	);

var keysForTwitter = keys.twitterKeys;

//store the user's command line input as variables

var wholeInput = process.argv;

//capture the action from the user's input

var action = process.argv[2];

//figure out which function to run based on user's terminal input

switch (action) {
	case "my-tweets":
		tweets();
		break;

	case "spotify-this-song":
		spot();
		break;

	case "movie-this":
		movie();
		break;

	case "do-what-it-says":
		says();
		break;
}

//Show last 20 tweets and when they were created
//Example input: node liri.js my-tweets

function tweets() {
 
	var params = {screen_name: '@aValleyUncanny'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
  			var myTweets = tweets;
  			for (var i = 0; i < tweets.length; i++) {
  				console.log("Tweet #" + parseInt(i+1) + " " + tweets[i].text);
  			}
  		}
	});

};


//Show song artist(s), song name, preview link from Spotify, album song is from
//Default if no song is provided song: 'The Sign' artist: 'Ace of Base'
//Example input: node liri.js spotify-this-song 'Bohemian Rhapsody'

function spot() {
	//Create variable to store song's name
	var songName = "";
	
	//If the user doesn't provide a song name, use Bohemian Rhapsody
	if (!wholeInput[3]) {
		songName = "Bohemian Rhapsody"
	}

	//If a multi-word song name is provided, figure out the number of words and save to variable songName
	if (wholeInput[3]) {
		for (var i = 3; i < wholeInput.length; i++) {
			if (i > 3 && i < wholeInput.length) {
				songName = songName + '+' + wholeInput[i];
			} else {
				songName += wholeInput[i];
			}
		}
	}
	console.log(songName);
	// Spofify keys saved in variable
	var spotify = new Spotify({
  		id: "e6050cbf903d4d50beb1ddc8ab3c6642",
  		secret: "e7f701f0ee274816a7ccbc3375ffee34"
	});
 
	spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  	}
 
		// console.log("Spotify Data:", data); 
		//Show song artist(s), song name, preview link from Spotify, album song is from
//take in multiple artists with loop
	console.log(data.tracks.items[0].artists[0].name);	
	console.log(data.tracks.items[0].album.name);
	console.log(data.tracks.items[0].album.external_urls.spotify);
	console.log(data.tracks.items[0].name);

});


};


//Show title of movie, year movie came out, IMDB rating of the movie, Rotten Tomatoes rating of movie, country of production, language of the movie, plot of the movie, actors in the movie
//Default movie if none is entered "Mr. Nobody" 
//Example input: node liri.js movie-this '<movie name here>'

function movie() {
	//Create variable to store movie's name
	movieName = "";
	
	//If the user doesn't provide a movie name, use Mr Nobody
	if (!wholeInput[3]) {
		movieName = "Mr." + "+" + "Nobody"
	}

	//If a multi-word movie name is provided, figure out the number of words and save to variable movieName
	if (wholeInput[3]) {
		for (var i = 3; i < wholeInput.length; i++) {
			if (i > 3 && i < wholeInput.length) {
			movieName = movieName + '+' + wholeInput[i];
		} else {
			movieName += wholeInput[i];
		}
	}
	}
	// Run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
	// This line is just to help us debug against the actual URL.
	console.log(queryUrl);
	request(queryUrl, function(error, response, body) {
  		// If the request is successful
  		if (!error && response.statusCode === 200) {
    	// Parse the body of the site and recover just the imdbRating
    	// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    	console.log(body);
    	console.log("Title: " + JSON.parse(body).Title);
    	console.log("Release Year: " + JSON.parse(body).Year);
    	console.log("Country of Production: " + JSON.parse(body).Country);
    	console.log("Language of Movie: " + JSON.parse(body).Language);
    	console.log("Plot of Movie: " + JSON.parse(body).Plot);
    	console.log("Actor(s) of Movie: " + JSON.parse(body).Actors);


    	//"Ratings":[{"Source":"Internet Movie Database","Value":"7.9/10"},{"Source":"Rotten Tomatoes","Value":"64%"},{"Source":"Metacritic","Value":"63/100"}]
    	// Store returned array of ratings objects in a variable
    	ratingsArray = JSON.parse(body).Ratings;
    	for (i = 0; i < ratingsArray.length; i++) {
    		var ratingsObjects = ratingsArray[i];
    		var Source = ratingsObjects.Source;
    		var Value = ratingsObjects.Value;
    		console.log("The rating from " + Source + ' is ' + Value);
    	}
  		}
	});
	console.log(movieName);
}; // close of movie function

//Takes text inside of random.txt to run spotify-this-song command
//Example input: node liri.js do-what-it-says

function says() {
	console.log("Says");
};
