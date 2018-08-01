# liri-node-app
* In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.
* This project introduced the use of the npm DotEnv module and the  git.ignore file. The Twitter and Spotify API's had to be figured out and used. The Request npm module was used to connect to the OMDB API.
* Using the command line interface different phrases/commands result in different responses.
1. 'my-tweets' will show last 20 tweets with dated created in terminal window.  This involed connecting to the Twitter API with keys and correct endpoint query.
2. spotify-this-song '<song name here>' This involved the use of the npm package node-sptifiy-api to connect. Also this required the functionality of reading more than one word on the cli. A default was also required which meant understanding how to communicate to the program when a value was not present.
3. movie-this '<movie name here>' Returns information on the movie. This used the request package and also required functionality of reading more that one word and a default option.
4. do-what-it-says` This uses the 'fs' Node package to read a text file with instructions.
* Additional functionality was added using the 'fs' package to log output to a text file.