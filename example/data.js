var bnet = require("../lib/battlenet");

bnet.data.battlegroups("us", function (d) {
  console.log(d);
});

bnet.data.classes("us", function(d) {
  console.log(d);
});
