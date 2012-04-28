battlenet
=========

A wrapper for the Battle.net API written in Node JS


## Usage

```javascript
var bnet = require("battlenet");

bnet.character("Medivh", "Uther", function(c) {
  console.log(c.name);
});
```
