var bnet = require("../lib/battlenet");

var arenaTeam = {
  region: "us",
  realm: "Lightning's Blade",
  teamSize: bnet.arenaTeamSizes.twovtwo,
  name: "Focus me"
}

bnet.arenaTeam(arenaTeam, function(t) {

});




