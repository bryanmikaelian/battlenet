var client = (function() {
  var get = function(options, callback) {
    var http = require("scoped-http-client");
    var data = {}
    return (function() {
      var scoped = http.create(options.host)
      .header('accept', 'application/json')
      .path(options.path)
      .get()(function(err, resp, body) {
        callback(body);
      });
    })();
  }

  return {
    region: "us",
    character: function(realm, name) {
      var r = encodeURIComponent(realm);
      var c = encodeURIComponent(name);
      var options = {
        host:  "http://" + this.region + ".battle.net",
        path: "api/wow/character/" + r + "/" + c
      }
      return get(options, function(data) {
        return data;
      });
    }
  }

})();

module.exports = client;



var c = client.character("Lightning's Blade", "Helera");
