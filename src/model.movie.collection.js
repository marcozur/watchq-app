define(function(require) {

  var $ = require('jquery'),
      Backbone = require('backbone'),
      Movie = require('model.movie'),
      Store = require('store');

  var MovieCollection = Backbone.Collection.extend({

    model: Movie,
    localStorage: new Store("movies"),

    search: function(title){
      var regex = new RegExp(title, 'i');

      if (title.length > 1) {
        this.lookup(title);
      }

      return movieCollection.filter(function(movie) {
        return regex.test(movie.get('title'));
      });
    },

    lookup: function(title) {
      var url = 'http://localhost:3000/search/' + title + '.json';

      if (title !== '') {
        $.getJSON(url, function(movies) {
          _.each(movies, this.createIfNotExists);
        }.bind(this));
      }
    },

    createIfNotExists: function(movie) {
      if (!movieCollection.get(movie.id)) {
        movieCollection.create(movie);
      }
    },

    comparator: function(movie) {
      return movie.get("title");
    }

  });

  var movieCollection = new MovieCollection();
  movieCollection.fetch();
  return movieCollection;

});
