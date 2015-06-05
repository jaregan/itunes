var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also not that we're using a 'service' and not a 'factory' so all your method you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

  this.getArtist = function (artist) {
  	var deferred = $q.defer();
  	$http({
  		url: "https://itunes.apple.com/search?term=" + artist + '&callback=JSON_CALLBACK',
  		method: 'JSONP'
  	}).then(function(response) {
      var songData = response.data.results;
      console.log(songData);
      var arr = [];
      for (var i = 0; i < songData.length; i++) {
      	arr.push({
	      AlbumArt: songData[i].artworkUrl100,
	      Artist: songData[i].artistName,
	      Track: songData[i].trackName,
	      Collection: songData[i].collectionName,
	      CollectionPrice: songData[i].collectionPrice,
	      Play: songData[i].previewUrl,
	      Type: songData[i].kind
      	});
      }
      deferred.resolve(arr);
    }, function (error) {
      console.log(error);
    });
    return deferred.promise;
  }

  this.getArtistFiltered = function (artist, filter) {
  	var deferred = $q.defer();
  	$http({
  		url: "https://itunes.apple.com/search?term=" + artist + '&callback=JSON_CALLBACK',
  		method: 'JSONP'
  	}).then(function(response) {
      var songData = response.data.results;
      // console.log(songData);
      var arr = [];
      for (var i = 0; i < songData.length; i++) {
      	if (filter === "All") {
	      	arr.push({
		      AlbumArt: songData[i].artworkUrl100,
		      Artist: songData[i].artistName,
		      Track: songData[i].trackName,
		      Collection: songData[i].collectionName,
		      CollectionPrice: songData[i].collectionPrice,
		      Play: songData[i].previewUrl,
		      Type: songData[i].kind
	      	});
      	}
      	else if (songData[i].kind === filter) {
      		arr.push({
		      AlbumArt: songData[i].artworkUrl100,
		      Artist: songData[i].artistName,
		      Track: songData[i].trackName,
		      Collection: songData[i].collectionName,
		      CollectionPrice: songData[i].collectionPrice,
		      Play: songData[i].previewUrl,
		      Type: songData[i].kind
	      	});
      	}
      	console.log(arr);
      }
      deferred.resolve(arr);
    }, function (error) {
      console.log(error);
    });
    return deferred.promise;
  }
});