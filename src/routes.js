define(['router'], function(Router) {

  // defining routes
  var search = function() {
    console.log("search");
  };

  var show = function(movieId) {
    console.log("show");
  };

  // return instance of router
  return new Router([
    { rule:/^$/, action:search, page:'search' },
    { rule:/^search$/, action:search, page:'search' },
    { rule:/^movie\?id=(.+)$/, action:show, page:'movie' }
  ]);

});
