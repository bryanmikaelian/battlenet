

var client = (function() {
  // Libraries
  var character = require("./battlenet/character");
  return {
    region: "us",
    character: function(realm, name) {
      var http = require("http"); 
      var url = require("url");
      var r = encodeURIComponent(realm);
      var options = {
        host: 'us.battle.net',
        path: "/api/wow/character/" + r + "/" + name
      };
      http.get(options, function(res) {
        res.on('data', function (chunk) {
          console.log('BODY: ' + chunk);
        });
      })
    }
  }
})();

module.exports = client;
