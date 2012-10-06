define(function(require) {

  var config = require('config');

  return Backbone.Model.extend({

    posterSmallLookups: [],
    getPosterSmallBase64: function(callback) {
      if (this.get("posterSmallBase64") !== undefined) {
        callback(this.get("posterSmallBase64"));
      } else {
        // only lookup if request has not yet been done
        if (_.indexOf(this.posterSmallLookups, this.id) === -1) {
          // data not available, get from server
          var url = config.serviceUrl + '/poster_base64?size=small&id=' + this.id;
          $.getJSON(url, function(data) {
            // save on model, execute callback
            var posterSmall = data.poster.replace(/[\n\r]/g, '');
            this.set('posterSmallBase64', posterSmall);
            this.save();
            callback(posterSmall);
          }.bind(this));
          this.posterSmallLookups.push(this.id);
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
