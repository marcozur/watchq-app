define(function(require) {

  var template = require('text!../templates/search.html'),
      movies = require('model.movie.collection');

  return Backbone.View.extend({

    template: _.template(template),

    events: {
      "keydown #txtSearch": "search"
    },

    initialize: function(el) {
      this.setElement(el);
    }, 

    render: function() {
      this.$el.append(template);
    },

    search: function(e) {
      var key = String.fromCharCode(e.keyCode),
          query = this.$el.find('#txtSearch').val() + key,
          shadowList = $('<ul>');

      _.each(movies.search(query), function(movie) {
        shadowList.append($('<li>', { html:movie.get('title') }));
      });

      this.$el.find("#list").html(shadowList.html());
    }

  });
  
});
