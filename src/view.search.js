define(function(require) {

  var template = require('text!../templates/search.html'),
      movies = require('model.movie.collection');

  return Backbone.View.extend({

    template: _.template(template),

    events: {
      "keyup #txtSearch": "search"
    },

    initialize: function(el) {
      this.setElement(el);
    }, 

    render: function() {
      this.$el.html(this.template());
    },

    currentMovies: [],
    search: function(e) {
      var query = this.$el.find('#txtSearch').val();

      if (e.keyCode === 8 || query.length === 1) {
        // the resultset is bigger than what we cached... get new
        this.currentMovies = movies.search(query);
      } else {
        // filter our cache
        var regex = new RegExp(query, 'i');
        this.currentMovies = _.filter(this.currentMovies, function(movie) {  
          return regex.test(movie.get('title'));
        });
      }

      var listMarkup = _.reduce(this.currentMovies, function(res, movie) {
        return res + '<li><a href="#movie?id=' + movie.id + '">' + movie.get('title') + '</a></li>';
      }, '');
      this.$el.find("#list").html(listMarkup);
    }

  });
  
});
