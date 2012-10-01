// setup require
require.config({
  baseUrl: 'src',
  paths: {
    'domReady': '../lib/domready-2.0.1',
    'jquery': '../lib/jquery-1.8.2',
    'underscore': '../lib/underscore-1.4.0',
    'backbone': '../lib/backbone-0.9.2',
    'store': '../lib/backbone-localstorage'
  },
  shim: {
    'jquery': {
      exports: '$'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

require(['domReady', 'jquery', 'model.movie.collection'], function(domReady, $, movies) {
  domReady(function() {

    $("#txtSearch").bind("keyup", function(ev) {
      // only lookup when not backspace
      $("#list").empty();
      _.each(movies.search($(this).val()), function(movie) {
        $("#list").append($('<li>', { html:movie.get('title') }));
      });
    });

  });
});
