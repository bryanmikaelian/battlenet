var bnet = require("../lib/battlenet");

bnet.region = "us";

// Without fields
bnet.character("Medivh", "Uther", "", function(c) {
  // do something

});

// With fields
bnet.character("Medivh ", "Uther", "guild,talents", function(c) {
  console.log(c);
});
