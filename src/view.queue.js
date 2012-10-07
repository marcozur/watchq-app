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

    render: function(e) {
      // remder template
      this.$el.html(template());

      var query = this.$el.find('#txtSearch').val(),
          searchResult = movies.filter(function(movie) { return movie.get('inQ') !== undefined; }),
          searchResultIds = _.map(searchResult, function(m) { return m.id; }),
          list = this.$el.find("#list");

      // add new items to results
      _.each(searchResult, function(movie) {
        var li = $('<li>', { html:itemTemplate({ movie:movie }) });
        list.append(li);

        // defer setting the thumbnail picture untill it's available
        movie.getPosterSmallBase64(function(base64) {
          setTimeout(function() {
            li.find('.thumb-80x').css({
              'background': 'url(data:image/jpeg;base64,'+base64+')',
              'opacity':1
            });
          }, 1);
        });
      }.bind(this));
    }

  });
  
});
