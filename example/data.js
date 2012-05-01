var bnet = require("../lib/battlenet");

bnet.data.battlegroups("us", function (d) {
  console.log(d);
});
