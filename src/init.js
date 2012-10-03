// extend Function with bind (missing in some mobile browsers)
Function.prototype.bind = function(scope) {
  var _function = this;
  return function() {
    return _function.apply(scope, arguments);
  };
};

// setup require
require.config({
  baseUrl: 'src',
  paths: {
    'domReady': '../lib/domready-2.0.1',
    'jquery': '../lib/jquery-1.8.2',
    'jqm': '../lib/jquery.mobile.custom',
    'router': '../lib/router',
    'underscore': '../lib/underscore-1.4.0',
    'backbone': '../lib/backbone-0.9.2',
    'store': '../lib/backbone-localstorage'
  }
});

// this is our entry point
require(['jquery', 'jqm', 'underscore', 'backbone'], function(domReady) {

  domReady(function() {

    // why does this fail?
    // var router = require('router');

    // navigate to the given path
    // routes.navigate(window.document.location.href.split("#")[1]);

    // $("#txtSearch").bind("keyup", function(ev) {
    //   // only lookup when not backspace
    //   $("#list").empty();
    //   _.each(movies.search($(this).val()), function(movie) {
    //     $("#list").append($('<li>', { html:movie.get('title') }));
    //   });
    // });

  });
});
