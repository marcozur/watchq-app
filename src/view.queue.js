define(function(require) {

  var templateMarkup = require('text!../templates/queue.html'),
      itemTemplateMarkup = require('text!../templates/movie.item.html'),
      movies = require('model.movie.collection'),
      template = _.template(templateMarkup),
      itemTemplate = _.template(itemTemplateMarkup);

  return Backbone.View.extend({

    initialize: function(el) {
      this.setElement(el);
    },

    render: function() {
      var listMarkup = _.reduce(movies.models, function(res, movie) {
            return movie.get('inQ') && res + itemTemplate({ movie:movie }) || res;
          }, '');

      this.$el.html(template());
      this.$el.find("#list").html(listMarkup);
    }

  });
  
});
