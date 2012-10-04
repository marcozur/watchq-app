define(function(require) {

  var Movie = require('model.movie'),
      Store = require('store');

  var MovieCollection = Backbone.Collection.extend({

    model: Movie,
    localStorage: new Store("movies"),

    search: function(title){
      var movies = [];

      if (title !== "") {
        if (title.length > 0) {
          this.lookup(title);
        }

        var regex = new RegExp(title, 'i');
        movies = this.filter(function(movie) {
          return regex.test(movie.get('title'));
        });
      }

      return movies;
    },

    pastLookups: [],
    lookup: function(title) {
      if (title !== '' && _.indexOf(this.pastLookups, title) === -1) {
        var url = 'http://localhost:3000/search/' + title + '.json';

        $.getJSON(url, function(movies) {
          _.each(movies, this.createIfNotExists);
          this.pastLookups.push(title);
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
