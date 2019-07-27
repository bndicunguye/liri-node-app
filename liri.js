require("dotenv").config();

var fs = require("fs");

var axios = require("axios");

var moment = require("moment");

var userSearch = "";
for(var i = 3; i<process.argv.length; i++){
    if(i !== 3){
        userSearch += " "
    }
    userSearch += process.argv[i]
}

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var search = process.argv[2]

console.log(search)

switch (search) {
    case "movie-this":
       movie()
        break;
    case "concert-this":
        console.log("concert")
        break;
    case "spotify-this-song":
        console.log("spotify")
        break;
    case "do-what-it-says":
        console.log("do what?")
        break;


}
function movie(){
    console.log("movie",userSearch)
    axios.get("http://www.omdbapi.com/?t="+userSearch+"=&plot=short&apikey=trilogy")
    .then(function(response){
        console.log('* Title of the movie : '+ response.data.Title)
        console.log('* Year the movie came out : '+ response.data.Released)
        console.log('* IMDB Rating of the movie. : '+ response.data.imdbRating)
        console.log('* Rotten Tomatoes Rating of the movie. : '+ response.data.Ratings)
        console.log('*  Country where the movie was produced. : '+ response.data.Country)
        console.log('* Language of the movie.: '+ response.data.Language)
        console.log('* Plot of the movie. : '+ response.data.Plot)
        console.log('* Actors in the movie. : '+ response.data.Actors)
      
        

    });

}

//  `concert-this`

//  `spotify-this-song`

//  `movie-this`

//  `do-what-it-says`


