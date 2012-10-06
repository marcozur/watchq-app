define(function(require) {

  var templateMarkup = require('text!../templates/search.html'),
      itemTemplateMarkup = require('text!../templates/movie.item.html'),
      movies = require('model.movie.collection'),
      template = _.template(templateMarkup),
      itemTemplate = _.template(itemTemplateMarkup);

  return Backbone.View.extend({

    events: {
      "keyup #txtSearch": "search"
    },

    initialize: function(el) {
      this.setElement(el);
    },

    render: function() {
      this.$el.html(template());
    },

    search: function(e) {
      var query = this.$el.find('#txtSearch').val(),
          searchResult = movies.search(query),
          list = this.$el.find("#list"),
          fakeList = $('<ul>');

      // search local data
      _.each(searchResult, function(movie) {
        var li = $('<li>', { id:'movieItem'+movie.id, html: itemTemplate({ movie:movie }) });
        fakeList.append(li);
        // defer setting the thumbnail picture till its available
        movie.getPosterSmallBase64(function(base64) {
          setTimeout(function() {
            $('#movieItem'+movie.id+' .thumb-80x').css({
              'background': 'url(data:image/jpeg;base64,'+base64+')',
              'opacity': 1
            });
          }, 200);
        });
      });

      if (e !== undefined) {
        // on [enter] lookup online
        if (e.keyCode === 13) {
          movies.lookup(query, this.search.bind(this));
        }

        // on 0.51sec no input, lookup online
        setTimeout(function() {
          if (query === this.$el.find('#txtSearch').val()) {
            movies.lookup(query, this.search.bind(this));
          }
        }.bind(this), 300);
      }

      // refresh list content
      list.html(fakeList.html());
      list.listview("refresh");
    }

  });
  
});
