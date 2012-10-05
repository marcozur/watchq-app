define(function() {

  return Backbone.Model.extend({

    lookup: function(callback) {
      var url = 'http://192.168.252.48:3000/movies/' + this.id + '.json';

      $.getJSON(url, function(movie) {
        var infos = {
          genres: movie.genres,
          synopsis: movie.synopsis,
          critics: movie.critics_consensus,
          cast: movie.abridget_cast,
          posterBig: movie.posterBigBase64
        };

        // update model with new infos
        this.set(infos);
        callback(this);
      }.bind(this));
    }

  });

});
