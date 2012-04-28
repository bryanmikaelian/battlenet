var client = (function() {
  var get = function(options) {
    var http = require("http");
    return (function() {
      http.get(options, function(res) {
        console.log(res.statusCode);
      }).on('data', function(d) {
        console.log('BODY: ' + d);
      });
    })();
  }

  return {
    region: "us",
    character: function(realm, name) {
      var r = encodeURIComponent(realm);
      var c = encodeURIComponent(name);
      var options = {
        host:  this.region + ".battle.net",
        headers: {
          'Content-Type': 'application/json'
        },
        path: "/api/wow/character/" + r + "/" + c
      }
      return get(options);
    }
  }

})();

module.exports = client;
