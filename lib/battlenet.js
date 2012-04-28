var client = (function() {
  var http = require("scoped-http-client");

  var scopedClient = function(url) {
    return http.create(url);
  }

  var get = function(options, callback) {
    scopedClient(options.host)
    .header('accept', 'application/json')
    .path(options.path)
    .query(options.query)
    .get()(function(err, resp, body) {
      callback(JSON.parse(body));
    });
  }

  return {
    region: "us",
    character: function(realm, name, fields, callback) {
      var r = encodeURIComponent(realm);
      var c = encodeURIComponent(name);
      var options = {
        host: "http://" + this.region + ".battle.net",
        query: {
          fields: fields
        },
        path: "api/wow/character/" + r + "/" + c
      }
      get(options, function(data) {
        callback(data);
      });
    }
  }

})();

module.exports = client;

