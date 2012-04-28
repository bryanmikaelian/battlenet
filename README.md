battlenet
=========

A wrapper for the Battle.net API written in Node JS

Install
=========
```
npm install bnet
```


 Usage
=========
Each resource allows you to pass in an object with various parameters.
For example, here is how you could get a character's profile along with
the guild and stats query string parameters:


```javascript
var bnet = require("bnet");

var char = {
  region: "us",
  name: "Uther",
  realm: "Medivh",
  fields: ["guild", "stats"] 
};

bnet.character(char, function(c) {
  console.log("Hello there " + c.name);  // returns "Hello there Uther"
});

```

All requests are returned in JSON format, allowing you to easily work
with the data collections.


More examples
=========

See the examples directory.
