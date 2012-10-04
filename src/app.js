define(function(require) {

  var Router = require('router'),
      SearchView = require('view.search');

  // defining actions
  var search = function(page) {
    this.searchView = this.searchView || new SearchView(page);
    this.searchView.render();
  };

  var show = function(movieId) {
    console.log("action: show", movieId);
  };

  // return instance of router
  return new Router([
    { rule:/^$/, action:search, page:'#search' },
    { rule:/^search$/, action:search, page:'#search' },
    { rule:/^movie\?id=(.+)$/, action:show, page:'#movie' }
  ]);

});
