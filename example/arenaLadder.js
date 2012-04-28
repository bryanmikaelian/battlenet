var bnet = require("../lib/battlenet");

var arenaLadder = {
  region: "us",
  battlegroup: "Vindication",
  teamSize: bnet.arenaTeamSizes.twovtwo,
  fields: {
    size: 50,
    asc: true
  }
}

bnet.arenaLadder(arenaLadder, function(l) {
  console.log(l);
});





