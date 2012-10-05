define(function(require) {

  var Router = require('router'),
      SearchView = require('view.search'),
      MovieView = require('view.movie'),
      QueueView = require('view.queue');

  // defining actions
  var search = function(page) {
    if (this.searchView === undefined) {
      this.searchView = new SearchView(page);
      this.searchView.render();
    }
  };

  var show = function(page, movieId) {
    this.movieView = new MovieView(page, movieId);
    this.movieView.render();
  };

  var queue = function(page) {
    this.queueView = new QueueView(page);
    this.queueView.render();
  };

  // return instance of router
  return new Router([
    { rule:/^$/, action:search, page:'#search' },
    { rule:/^search$/, action:search, page:'#search' },
    { rule:/^movie\?id=(.+)$/, action:show, page:'#movie' },
    { rule:/^queue$/, action:queue, page:'#queue' }
  ]);

});
