// pseudo AMD, requires jquery and jqm to be loaded on window object
define(function() {

  // return constructor function
  return function(routes) {

    var route = function(query) {
      // make sure query is at least an empty string, and is only the segment after '#' if there
      query = query && (/\#/.test(query) && query.split("#")[1] || query) || '';
      console.log("router has been called:", query);

      // test each route, call action if match
      for (var i = 0, il = routes.length; i < il; i++) {
        if (routes[i].rule.test(query)) {
          var params = query.match(routes[i].rule);
          routes[i].action.apply(this, params.slice(1, params.length));
          changePage($(routes[i].page), { changehash:true });
          break;
        }
      }
    }.bind(this);

    var changePage = function(container, options) {
      console.log("changePage:", container, options);
      $.mobile.changePage(container, options);
      container.page('destroy').page();
    };

    this.initialize = function() {
      // make jqm use our routes
      $.mobile.ajaxEnabled = false;
      
      // trigger routes on jqm's pagebeforechange event, only route when called with string
      $(document).bind("pagebeforechange", function(e, data) {
        if (typeof data.toPage === "string" && data.toPage !== window.location.href) {
          this.navigate(data.toPage);
        }
      }.bind(this));

      this.navigate(document.location.href);
    };

    this.navigate = function(toPage) {
      console.log("navigate", toPage);
      if (typeof toPage === 'string') {
        route(toPage);
      } else {
        changePage(toPage, { changehash:false });
      }
    };

    return this;
  };

});
