var bnet = require("../lib/battlenet");

var char = {
  region: "us",
  name: "Uther",
  realm: "Medivh",
  fields: ["guild", "stats"] 
};

bnet.character(char, function(c) {

});



