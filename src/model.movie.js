define(function(require) {

  var config = require('config');

  return Backbone.Model.extend({

    posterSmallCache: {},
    getPosterSmallBase64: function(callback) {
      if (this.posterSmallCache[this.id]) {
        // get from cache first
        callback(this.posterSmallCache[this.id]);

      } else if (this.get("posterSmallBase64") !== undefined) {
        // get from model
        callback(this.get("posterSmallBase64"));

      } else {
        // request from server (if request has not yet been done)
        if (this.posterSmallCache[this.id] === undefined) {
          var url = config.serviceUrl + '/poster_base64?size=small&id=' + this.id;
          
          $.getJSON(url, function(data) {
            // save in cache, execute callback
            var posterSmall = data.poster.replace(/[\n\r]/g, '');
            this.posterSmallCache[this.id] = posterSmall;
            callback(posterSmall);
          }.bind(this));

          // create empty entry in cache so we dont look it up twice
          this.posterSmallCache[this.id] = null;
        }
      }
    },

    lookup: function(callback) {
      var url = config.serviceUrl + '/movies/' + this.id + '.json';

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
