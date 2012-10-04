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
          listMarkup = _.reduce(searchResult, function(res, movie) {
            return res + itemTemplate({ movie:movie });
          }, '');

      list.html(listMarkup);
      list.listview("refresh");
    }

  });
  
});
