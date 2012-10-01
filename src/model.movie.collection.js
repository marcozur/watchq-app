define(function(require) {

  var $ = require('jquery'),
      Backbone = require('backbone'),
      Movie = require('model.movie'),
      Store = require('store');

  var MovieCollection = Backbone.Collection.extend({

    model: Movie,
    localStorage: new Store("movies"),

    search: function(string){
      $.get('http://localhost:3000/search/' + string + '.json', function() {
        console.log(arguments);
      });
    }

  });

  return new MovieCollection();

});
