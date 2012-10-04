define(function(require) {

  var template = require('text!../templates/movie.html'),
      movies = require('model.movie.collection');

  return Backbone.View.extend({

    template: _.template(template),

    initialize: function(el, movieId) {
      this.setElement(el);
      this.movie = movies.get(movieId);
    },

    render: function() {
      this.$el.html(this.template({ movie:this.movie }));
    }

  });
  
});
