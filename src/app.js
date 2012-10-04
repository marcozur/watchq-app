define(['router'], function(Router) {

  // defining actions
  var search = function() {
    console.log("action: search");
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
