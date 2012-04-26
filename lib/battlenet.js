var http = require("http");

var client = (function() {
  // Libraries
  var character = require("./battlenet/character");

  // Common req function object
  var req  = function(options) {
    return http.request(options, function(res) {
      res.on('data', function (chunk) {
        return chunk;
      });
    });
  }

  return {
    region: "us",
    character: function(realm, name) {
      character(realm, name, req);
    }
  }

})();

module.exports = client;
