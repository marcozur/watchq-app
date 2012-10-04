// pseudo AMD, requires jquery and jqm to be loaded on window object
define(function() {

  // return constructor function
  return function(routes) {

    var route = function(query) {
      // make sure query is at least an empty string
      // also, is only the segment after '#' if there
      query = typeof query === "string" && /\#/.test(query) && query.split("#")[1] || '';

      // test each route, call action and return page object on match
      for (var i = 0, il = routes.length; i < il; i++) {
        if (routes[i].rule.test(query)) {
          var params = query.match(routes[i].rule);
          routes[i].action.apply(this, params.slice(1, params.length));
          return $(routes[i].page);
        }
      }
    }.bind(this);

    var changePage = function(container, url) {
      $.mobile.changePage(container, { dataUrl:url });
      container.page('destroy').page();
    };

    this.initialize = function() {
      // make jqm use our routes
      $.mobile.ajaxEnabled = false;
      
      // trigger routes on jqm's pagebeforechange event
      $(document).bind("pagebeforechange", function(e, data) {
        if (typeof data.toPage === "string") {
          // when called with url stop everything,
          // execute corresponding action, change to its page.
          e.preventDefault();
          changePage(route(data.toPage), data.toPage);
        }
      }.bind(this));

      // kick on first page
      this.navigate(document.location.href);
    };

    this.navigate = function(toPage) {
      changePage(route(toPage), toPage);
    };

    return this;
  };

});
