
var client = (function() {
  var get = function(options) {
    return options;
  }
  return {
    region: "us",
    character: function(realm, name) {
      return get(3);
    }
  }
})();

module.exports = client;
