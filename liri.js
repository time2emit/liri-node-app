//require the filesystem package for node have the ability to read from and write to other files
//require twitter and spotify modules
//require request module

fs = require("fs");
twitter = require("twitter");
spotify = require("spotify");
request = require("request");

//grab keys from keys.js and save it in a variable

keys = require("./keys.js");
console.log(keys);

//store the user's command line input as variables

console.log('This is all of process.argv ' + process.argv);
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
	console.log("Tweets");
}


//Show song artist(s), song name, preview link from Spotify, album song is from
//Default if no song is provided song: 'The Sign' artist: 'Ace of Base'
//Example input: node liri.js spotify-this-song 'Bohemian Rhapsody'

function spot() {
	console.log("Spotify");
}


//Show title of movie, year movie came out, IMDB rating of the movie, Rotten Tomatoes rating of movie, country of production, language of the movie, plot of the movie, actors in the movie
//Default movie if none is entered "Mr. Nobody" 
//Example input: node liri.js movie-this '<movie name here>'

function movie() {
	console.log("Movie");
}

//Takes text inside of random.txt to run spotify-this-song command
//Example input: node liri.js do-what-it-says

function says() {
	console.log("Says");
}

