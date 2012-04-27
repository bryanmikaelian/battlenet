
var client = (function() {
  var get = function(options) {
    return options;
  }
  return {
    region: "us",
    character: function(realm, name) {
      var r = encodeURIComponent(realm);
      var c = encodeURIComponent(name);
      var options = {
        host:  this.region + ".battle.net",
        path: "/api/wow/character/" + r + "/" + c
      }
      return get(options);
    }
  }
})();

module.exports = client;
