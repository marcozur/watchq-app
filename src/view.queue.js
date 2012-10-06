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
      var fakeList = $('<ul>'),
          moviesOnQueue = movies.filter(function(movie) {
            return movie.get('inQ');
          });

      this.$el.html(template());

      _.each(moviesOnQueue, function(movie) {
        var li = $('<li>', { html: itemTemplate({ movie:movie }) });
        fakeList.append(li);

        // defer setting the thumbnail picture till its available
        movie.getPosterSmallBase64(function(base64) {
          li.find(".thumb-80x").css({ 'background':'url(data:image/jpeg;base64,'+base64+')' });
        });
      });

      this.$el.find("#list").html(fakeList.html());
    }

  });
  
});
