require("dotenv").config();
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
//console.log(client);
//console.log(spotify);
var nodeArgs = process.argv;
var operand = nodeArgs[2];

var titleName = "";
  for (var i = 3 ; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      titleName = titleName + "+" + nodeArgs[i];
    } else {
      titleName += nodeArgs[i];
    }
  }

switch(operand){
  case "my-tweets":
  tweetInfo();
  break;
  case "spotify-this-song":
  spotifyInfo(titleName);
  break;
  case "movie-this":
  movieInfo(titleName);
  break;
  case "do-what-it-says":
  readInfo();
  break;
  default: 
  console.log("Error. None Worked");
}

function tweetInfo(){
  var params = {screen_name: '@NellWinnifred'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
   for (var i = 0; i < tweets.length; i++) {
     var date = tweets[i].created_at;
     console.log(date)
     console.log(tweets[i].text);
  
     fs.appendFile("log.txt", tweets[i].text, function(err) {
      if (err) {
        console.log(err);
      }
    });
   }
  } else {
    console.log('Error occurred');
  }
});
}

 function spotifyInfo(song) {
   console.log(song);
   if(song) {
  spotify.search({ type: 'track', query: song}, function(error, data){
  if(!error){
    for(var i = 0; i < data.tracks.items.length; i++){
      var songData = data.tracks.items[i];
      //artist
      console.log("Artist: " + songData.artists[0].name);
      //song name
      console.log("Song: " + songData.name);
      //spotify preview link
      console.log("Preview URL: " + songData.preview_url);
      //album name
      console.log("Album: " + songData.album.name);
      fs.appendFile("log.txt", songData.artists[0].name, function(err) {
       if (err) {
         console.log(err);
       }
     });
    }
  } else {
    console.log('Error occurred.1');
  }
});
}
}  

function movieInfo(movieName) {
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {

  // If the request was successful...
      if (!error && response.statusCode === 200) {

    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("Rated: " + JSON.parse(body).Rated);
    console.log("Ratings: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country Produced: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);

    fs.appendFile("log.txt", JSON.parse(body).Title +" "+ JSON.parse(body).Plot, function(err) {
     if (err) {
       console.log(err);
     }
   });
    
  } else {
    console.log('Error occurred.2');
  }
}); 
}

function readInfo() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    } 
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
    spotifyInfo(dataArr[1]);
    fs.appendFile("log.txt", spotifyInfo(dataArr[1]), function(err) {
     if (err) {
       console.log(err);
     }
   });
  });
}





