// setup require
require.config({
  baseUrl: 'src',
  paths: {
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

require(['backbone', 'model.movie.collection'], function(Backbone, movies) {
  var list = $('<ul>');

  movies.search('pulp', function(movies) {
    _.each(movies, function(movie) {
      list.append($('<li>', { html:movie.title }));
    });
  });
    
  $('body').append(list);

});
