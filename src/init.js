// extend Function with bind (missing in some mobile browsers)
Function.prototype.bind = function(scope) {
  var _function = this;
  return function() {
    return _function.apply(scope, arguments);
  };
};

// setup require
require.config({
  paths: {
    'text': '../lib/require-text-2.0.3',
    'domReady': '../lib/domready-2.0.1',
    'jquery': '../lib/jquery-1.8.2',
    'jqm': '../lib/jquery.mobile-1.2.0',
    'router': '../lib/router',
    'underscore': '../lib/underscore-1.4.0',
    'backbone': '../lib/backbone-0.9.2',
    'store': '../lib/backbone-localstorage'
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'store': ['backbone'],
    'jqm': ['jquery']
  }
});

// make sure our non AMD depedencies are available as global objects
require(['jquery', 'jqm', 'underscore', 'backbone'], function() {

  // go on kicking off the app
  require(['domReady', 'app'], function(domReady, App) {
    domReady(function() {

        App.initialize();

    });
  });

});
