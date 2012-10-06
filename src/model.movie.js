define(function() {

  return Backbone.Model.extend({

    getPosterSmallBase64: function(callback) {
      if (!this.get("posterSmallBase64")) {
        // data not available, get from server
        var url = 'http://localhost:3000/poster_base64?size=small&id=' + this.id;
        $.getJSON(url, function(data) {
          // save on model, execute callback
          var posterSmall = data.poster.replace(/[\n\r]/g, '');
          this.set('posterSmallBase64', posterSmall);
          this.save();
          callback(posterSmall);
        }.bind(this));
      } else {
        callback(this.get("posterSmallBase64"));
      }
    },

    lookup: function(callback) {
      var url = 'http://localhost:3000/movies/' + this.id + '.json';

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
        this.save();
        
        callback(this);
      }.bind(this));
    }

  });

});
