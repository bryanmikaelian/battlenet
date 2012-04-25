this.client = function() {
  var http = require("scoped-http-client");
  return {
    url: "http://us.battle.net",
    get: function() {
      return http.create(this.url);
    }
  };
};
