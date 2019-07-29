require("dotenv").config();

var fs = require("fs");

var axios = require("axios");

var moment = require("moment");

var userSearch = "";

var Spotify = require("node-spotify-api");

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

for (var i = 3; i < process.argv.length; i++) {
    if (i !== 3) {
        userSearch += " "
    }

    userSearch += process.argv[i]

}
    var search = process.argv[2]
function check(){
switch (search) {
    case "movie-this":
        console.log('booo',userSearch)
        if (!userSearch) {
            userSearch = "Mr. Nobody"
        }
        movie()
        break;
    case "concert-this":
        concert()
        break;
    case "spotify-this-song":
        if (userSearch === undefined) {
            userSearch = "The sign by Ace of Base"
        }
        song()
        break;
    case "do-what-it-says":
      dowhatitsays()
      console.log("bona")
        break;

}
}
check()
function movie() {
    console.log("movie", userSearch)
    axios.get("http://www.omdbapi.com/?t=" + userSearch + "=&plot=short&apikey=trilogy")
        .then(function (response) {

            console.log('* Title of the movie : ' + response.data.Title)
            console.log('* Year the movie came out : ' + response.data.Released)
            console.log('* IMDB Rating of the movie. : ' + response.data.imdbRating)
            console.log('* Rotten Tomatoes Rating of the movie. : ' + response.data.Ratings)
            console.log('*  Country where the movie was produced. : ' + response.data.Country)
            console.log('* Language of the movie.: ' + response.data.Language)
            console.log('* Plot of the movie. : ' + response.data.Plot)
            console.log('* Actors in the movie. : ' + response.data.Actors)



        });
}




function song() {

    spotify
        .search({ type: 'track', query: userSearch })
        .then(function (response) {
            console.log("*Artist :" + response.tracks.items[0].album.artists[0].name);
            console.log("*The song's name :" + response.tracks.items[0].name);
            console.log("*A preview link of the song from Spotify :" + response.tracks.items[0].href);
            console.log("*The album that the song is from :" + response.tracks.items[0].album.name);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function concert() {
    axios.get("https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp")
   
    .then(function (response) {
    
       
      console.log("*Name of the venue :" + response.data[0].venue.name);
      console.log("*Venue location :" + response.data[0].venue.city);
      console.log("*Date of the Event :" + response.headers.date);
    })
    .catch(function (error) {
    
      console.log(error);
    })
    .finally(function () {
      
    });  

}
function dowhatitsays() {
    fs.readFile('./random.text',"utf8", function(err, data) {
        if (err) throw err;
       data= data.split(',')
                console.log(data);
                search=data[0]
                userSearch=data[1]
console.log(search,userSearch)
      check()
      });

}




