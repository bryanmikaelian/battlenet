this.client = function() {
  var http = require("scoped-http-client");
  var character = require("./battlenet/character");
  return {
    url: "http://us.battle.net",
    get: function() {
      return http.create(this.url);
    },
    character: function(realm, name) {

    }
  };
};
