define(function(require) {

  var templateMarkup = require('text!../templates/movie.html'),
      movies = require('model.movie.collection'),
      template = _.template(templateMarkup);

  return Backbone.View.extend({

    events: {
      "change #switchQ": "addToQ"
    },

    initialize: function(el, movieId) {
      _.bindAll(this, 'addToQ');
      this.setElement(el);
      this.movie = movies.get(movieId);
    },

    render: function() {
      var inQ = !this.movie.get('inQ') && 'off' || 'on';

      this.$el.html(template({ movie:this.movie }));

      setTimeout(function() {
        this.$el.find('#switchQ').val(inQ).slider("refresh");
      }.bind(this), 500);

      this.movie.lookup(function(movie) {
        this.$el.html(template({ movie:movie })).page("destroy").page();
        this.$el.find('#switchQ').val(inQ).slider("refresh");
      }.bind(this));
    },

    addToQ: function() {
      if (!this.movie.get('inQ')) {
        this.movie.set({ inQ: new Date() });
      } else {
        this.movie.set({ inQ: false });
      }
      this.movie.save();
    }

  });
  
});
