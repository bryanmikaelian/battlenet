this.get = (function(reg) {
  var http = require("scoped-http-client");
  var char = require("./battlenet/character");
  var region = "us";
  return {
    url: "http://" + region + ".battle.net",
    character: function(realm, name) {
      return realm + ": " + name;
    }
  } 
})();


