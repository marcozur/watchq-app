define(function(require) {

  var $ = require('jquery'),
      Backbone = require('backbone'),
      Movie = require('model.movie'),
      Store = require('store');

  var MovieCollection = Backbone.Collection.extend({

    model: Movie,
    localStorage: new Store("movies"),

    search: function(string, callback){
      var regex = new RegExp(string, 'i');

      $.getJSON('http://localhost:3000/search/' + string + '.json', function(movies) {
        _.each(movies, function(movie) {
          if (!movieCollection.get(movie.id)) {
            movieCollection.create(movie);
          }
        });

        // callback(movies); ???
      });

      return movieCollection.filter(function(movie) {
        return regex.test(movie.get('title'));
      });
    }

  });

  var movieCollection = new MovieCollection();
  movieCollection.fetch();
  return movieCollection;

});
