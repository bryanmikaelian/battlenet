var client = (function() {
  var http = require("scoped-http-client");

  var scopedClient = function(url) {
    return http.create(url);
  }

  var get = function(options, callback) {
    scopedClient(options.host)
    .header('accept', 'application/json')
    .path(options.path)
    // TODO Figure out a better way to handle the query string concept.  Passing in "" is not the best solution
    .query(options.query)
    .get()(function(err, resp, body) {
      // TODO: Check for response of 200
      callback(JSON.parse(body));
    });
  }

  return {
    region: "us",

    character: function(realm, name, fields, callback) {
      var r = encodeURIComponent(realm);
      var c = encodeURIComponent(name);
      var options = {
        host: "http://" + this.region + ".battle.net",
        query: {
          fields: fields
        },
        path: "api/wow/character/" + r + "/" + c
      }
      get(options, function(data) {
        callback(data);
      });
    },

    guild: function(realm, name, fields, callback) {  
      var r = encodeURIComponent(realm);
      var g = encodeURIComponent(name);
      var options = {
        host: "http://" + this.region + ".battle.net",
        query: {
          fields: fields
        },
        path: "api/wow/guild/" + r + "/" + g
      }
      get(options, function(data) {
        callback(data);
      });
    },

    realm: function(callback) {
      var options = {
        host: "http://" + this.region + ".battle.net",
        // TODO: Figure out why realms with special characters and whitespace are not being returned even when encoded
        query: {
          realms: ""
        },
        path: "api/wow/realm/status"
      }
      get(options, function(data) {
        callback(data);
      });
    },

    auctions: function(realm, callback) {
      var r = encodeURIComponent(realm);
      var options = {
        host: "http://" + this.region + ".battle.net",
        query: {},
        path: "api/wow/auction/data/" + r
      }
      get(options, function(data) {
        callback(data);
      });
    },

    item: function(itemID, callback) {
      var options = {
        host: "http://" + this.region + ".battle.net",
        query: {},
        path: "api/wow/item/" + itemID
      }

      get(options, function(data) {
        callback(data);
      });
    },

    arenaTeam: function(realm, teamsize, teamname, callback) {
      // TODO: Use an object instead of a string for the team size
      var r = encodeURIComponent(realm);
      var t = encodeURIComponent(teamname);
      var options = {
        host: "http://" + this.region + ".battle.net",
        query: {},
        path: "api/wow/arena/" + r + "/" + teamsize + "/" + t
      }

      get(options, function(data) {
        callback(data);
      })
    },

    arenaLadder: function(battlegroup, teamsize, callback) {
      var b = encodeURIComponent(battlegroup);
      var options = {
        host: "http://" + this.region + ".battle.net",
        query: {},
        path: "api/wow/pvp/arena/" + b + "/" + teamsize
      }
      get(options, function(data) {
        callback(data);
      })
    },

    ratedBG: function(callback) {
      var options = {
        host: "http://" + this.region + ".battle.net",
        query: {},
        path: "/api/wow/pvp/ratedbg/ladder"
      }
      get(options, function(data) {
        callback(data);
      })
    },

    quest: function(questID, callback) {
      var options = {
        host: "http://" + this.region + ".battle.net",
        query: {},
        path: "/api/wow/quest/" + questID
      }
      get(options, function(data) {
        callback(data);
      })
    }
  }

})();

module.exports = client;

