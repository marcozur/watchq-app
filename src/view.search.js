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
      this.$el.html(template({ moviesCount: movies.length }));
    },

    moviesCache: {},
    search: function(e) {
      var query = this.$el.find('#txtSearch').val(),
          searchResult = movies.search(query),
          searchResultIds = _.map(searchResult, function(m) { return m.id; }),
          list = this.$el.find("#list");

      // remove items no longer valid from list, cache
      _.each(_.keys(this.moviesCache), function(key) {
        if (_.indexOf(searchResultIds, key) === -1) {
          this.moviesCache[key].remove();
          delete this.moviesCache[key];
        }
      }.bind(this));

      // add new items to results
      _.each(searchResult, function(movie) {
        if (this.moviesCache[movie.id] === undefined) {
          var li = $('<li>', { html:itemTemplate({ movie:movie }) });

          // add to DOM, cache
          list.append(li);
          this.moviesCache[movie.id] = li;

          // defer setting the thumbnail picture untill it's available
          movie.getPosterSmallBase64(function(base64) {
            setTimeout(function() {
              li.find('.thumb-80x').css({
                'background': 'url(data:image/jpeg;base64,'+base64+')',
                'opacity':1
              });
            }, 1);
          });
        }
      }.bind(this));

      // reorder listitems to match collections comparator
      _.each(searchResultIds, function(id) {
        this.moviesCache[id].detach().insertAfter(list.find('li:last'));
      }.bind(this));

      // re-enhance list
      list.listview("refresh");

      // start online lookup on enter or after a specific time
      if (e !== undefined) {
        if (e.keyCode === 13) {
          // lookup on enter
          movies.lookup(query, this.search.bind(this));
        }

        setTimeout(function() {
          // lookup online if query is still the same
          if (query === this.$el.find('#txtSearch').val()) {
            movies.lookup(query, this.search.bind(this));
          }
        }.bind(this), 650);
      }
    }

  });
  
});
