// pseudo AMD, requires jquery and jqm to be loaded on window object
define(function() {

  // return constructor function
  return function(routes) {

    var initialize = function() {
      // make jqm use our routes
      $.mobile.ajaxEnabled = false;
      $.mobile.hashListeningEnabled = true;

      // trigger new routes on jqm's pagebeforechange
      $(document).bind("pagebeforechange", function(e, data) {
        if (typeof data.toPage === "string" && data.toPage !== window.location.href) {
          route.apply(this, [data.toPage.split("#")[1]]);
        }
      }.bind(this));
    };

    var route = function(query) {
      query = query || '';

      // test each route, call action if match
      for (var i = 0, il = routes.length; i < il; i++) {
        if (routes[i].rule.test(query)) {
          var params = query.match(routes[i].rule);
          routes[i].action.apply(this, params.slice(1, params.length));
          changePage($(routes[i].page));
          break;
        }
      }
    }.bind(this);

    var changePage = function(container, options) {
      // set changehash value default to true
      options = _.extend({ changehash:true }, options || {});

      $.mobile.changePage(container, options);
      container.page('destroy').page();
    };

    this.navigate = function(toPage) {
      if (typeof toPage === 'string') {
        route(toPage);
      } else {
        changePage(toPage, false);
      }
    };

    initialize();
    return this;
  };

});
