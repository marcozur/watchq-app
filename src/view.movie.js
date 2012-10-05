define(function(require) {

  var templateMarkup = require('text!../templates/movie.html'),
      movies = require('model.movie.collection'),
      template = _.template(templateMarkup);

  return Backbone.View.extend({

    initialize: function(el, movieId) {
      this.setElement(el);
      this.movie = movies.get(movieId);
    },

    render: function() {
      this.$el.html(template({ movie:this.movie }));

      this.movie.lookup(function(movie) {
        console.log(movie);
        this.$el.html(template({ movie:movie })).page("destroy").page();
      }.bind(this));
    }

  });
  
});
